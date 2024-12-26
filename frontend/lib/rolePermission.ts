import { Users, Shield, KeyRound, Monitor, ScanFace, Logs } from "lucide-react";

export const rolePermission = [
  { role: "admin", permission: "Users", icon: Users },
  { role: "admin", permission: "Roles", icon: Shield },
  { role: "admin", permission: "Permissions", icon: KeyRound },
  { role: "admin", permission: "Devices", icon: Monitor },
  { role: "registrar", permission: "Students", icon: Users },
  { role: "gate", permission: "Current", icon: ScanFace },
  { role: "gate", permission: "History", icon: Logs },
];
