import { Users, Shield, KeyRound, Monitor } from "lucide-react";

export const rolePermission = [
  { role: "admin", permission: "Users", icon: Users },
  { role: "admin", permission: "Roles", icon: Shield },
  { role: "admin", permission: "Permissions", icon: KeyRound },
  { role: "admin", permission: "Devices", icon: Monitor },
  { role: "registrar", permission: "Students", icon: Users },
];
