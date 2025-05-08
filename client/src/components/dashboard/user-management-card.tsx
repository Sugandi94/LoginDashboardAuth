import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Pencil, Trash2, X, Check, Loader2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

// Definisikan tipe data User untuk tampilan (tanpa password)
type UserDisplay = Omit<import("@shared/schema").User, "password">;

export default function UserManagementCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<UserDisplay | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<UserDisplay>>({});
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  // Mengambil data semua pengguna
  const { 
    data: users = [], 
    isLoading, 
    refetch 
  } = useQuery<UserDisplay[]>({
    queryKey: ["/api/users"],
    refetchOnWindowFocus: false,
  });

  // Filter users berdasarkan pencarian
  const filteredUsers = users.filter((userData) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      userData.username.toLowerCase().includes(searchLower) ||
      userData.firstName.toLowerCase().includes(searchLower) ||
      userData.lastName.toLowerCase().includes(searchLower) ||
      userData.email.toLowerCase().includes(searchLower)
    );
  });

  // Mutasi untuk update user
  const updateUserMutation = useMutation({
    mutationFn: async (data: { id: number; userData: Partial<UserDisplay> }) => {
      const res = await apiRequest("PUT", `/api/users/${data.id}`, data.userData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "User updated",
        description: "User information has been successfully updated.",
      });
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      // Reset form
      setEditingUser(null);
      setEditFormData({});
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutasi untuk delete user
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/users/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "User deleted",
        description: "User has been successfully removed.",
      });
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      // Reset delete state
      setDeleteUserId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle edit user
  const handleEditUser = (userData: UserDisplay) => {
    setEditingUser(userData);
    setEditFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
    });
  };

  // Handle save edited user
  const handleSaveEdit = () => {
    if (!editingUser) return;

    updateUserMutation.mutate({
      id: editingUser.id,
      userData: editFormData,
    });
  };

  // Handle delete user
  const handleDeleteUser = (id: number) => {
    setDeleteUserId(id);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (deleteUserId !== null) {
      deleteUserMutation.mutate(deleteUserId);
    }
  };

  // Handle input change for edit form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Registered Users</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((userData) => (
                  <TableRow key={userData.id}>
                    <TableCell className="font-medium">{userData.id}</TableCell>
                    <TableCell>{userData.username}</TableCell>
                    <TableCell>{userData.firstName}</TableCell>
                    <TableCell>{userData.lastName}</TableCell>
                    <TableCell>{userData.email}</TableCell>
                    <TableCell>
                      {new Date(userData.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(userData)}
                          disabled={userData.id === user?.id}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(userData.id)}
                          disabled={userData.id === user?.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update the user information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  value={editFormData.username || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="firstName" className="text-right">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={editFormData.firstName || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lastName" className="text-right">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={editFormData.lastName || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editFormData.email || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingUser(null)}
                disabled={updateUserMutation.isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteUserId(null)}
                disabled={deleteUserMutation.isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}