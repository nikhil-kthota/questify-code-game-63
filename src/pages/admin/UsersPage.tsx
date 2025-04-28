
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Star, Clock } from "lucide-react";

const UsersPage = () => {
  // Mock data - in a real app, this would come from API
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Alex Johnson", 
      email: "alex@example.com",
      username: "alexj",
      xp: 2340,
      level: 12,
      streak: 7,
      joinedDate: "Jan 15, 2023",
      status: "active" 
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      email: "maria@example.com",
      username: "mgarcia",
      xp: 12450,
      level: 34,
      streak: 5,
      joinedDate: "Nov 20, 2022",
      status: "active" 
    },
    { 
      id: 3, 
      name: "Sam Taylor", 
      email: "sam@example.com",
      username: "staylor",
      xp: 11320,
      level: 31,
      streak: 7,
      joinedDate: "Dec 5, 2022",
      status: "active" 
    },
    { 
      id: 4, 
      name: "Li Wei", 
      email: "li@example.com",
      username: "liwei",
      xp: 9750,
      level: 28,
      streak: 4,
      joinedDate: "Feb 2, 2023",
      status: "active" 
    },
    { 
      id: 5, 
      name: "Jordan Smith", 
      email: "jordan@example.com",
      username: "jsmith",
      xp: 8240,
      level: 25,
      streak: 3,
      joinedDate: "Mar 10, 2023",
      status: "suspended" 
    },
    { 
      id: 6, 
      name: "Priya Patel", 
      email: "priya@example.com",
      username: "ppatel",
      xp: 8780,
      level: 26,
      streak: 6,
      joinedDate: "Feb 15, 2023",
      status: "active" 
    },
    { 
      id: 7, 
      name: "Sophie Müller", 
      email: "sophie@example.com",
      username: "smuller",
      xp: 9320,
      level: 27,
      streak: 0,
      joinedDate: "Jan 28, 2023",
      status: "inactive" 
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "" || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage users and their access</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button>Export</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>XP / Level</TableHead>
              <TableHead>Streak</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-neon-blue" />
                    <span>{user.xp.toLocaleString()} / Lvl {user.level}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-neon-red" />
                    <span>{user.streak} days</span>
                  </div>
                </TableCell>
                <TableCell>{user.joinedDate}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-yellow-600">
                              Suspend User
                            </DropdownMenuItem>
                          ) : user.status === "suspended" ? (
                            <DropdownMenuItem className="text-green-600">
                              Reactivate User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      {selectedUser && (
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-center py-4">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarFallback className="text-xl">
                                {selectedUser.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                            <p className="text-muted-foreground">@{selectedUser.username}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 text-neon-blue" />
                              <span>Level {selectedUser.level}</span>
                            </div>
                          </div>
                          <div className="space-y-3 py-2">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm font-medium">Joined</p>
                                <p className="text-sm text-muted-foreground">{selectedUser.joinedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">XP</p>
                                <p className="text-sm text-muted-foreground">{selectedUser.xp.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Streak</p>
                                <p className="text-sm text-muted-foreground">{selectedUser.streak} days</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                selectedUser.status === 'active' ? 'bg-green-100 text-green-800' :
                                selectedUser.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-4">
                            <Button variant="outline">View Full Profile</Button>
                            <Button>Edit User</Button>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
