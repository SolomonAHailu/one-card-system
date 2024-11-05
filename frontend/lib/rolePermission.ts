import { Users, Shield, Key, Monitor } from "lucide-react";

export const rolePermission = [
  { role: "admin", permission: "Users", icon: Users },
  { role: "admin", permission: "Roles", icon: Shield },
  { role: "admin", permission: "Permissions", icon: Key },
  { role: "admin", permission: "Devices", icon: Monitor },
];
