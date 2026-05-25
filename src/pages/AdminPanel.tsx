import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Shield, MapPin, Trash2, UserPlus, X, Crown, Briefcase, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as backend from "../backend/mockBackend";
import type { UserRole, UserLocation } from "../backend/types";

interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location: UserLocation;
  managerId?: string;
  createdAt: string;
}

export default function AdminPanel() {
  const { language } = useLanguage();
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<SafeUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [locFilter, setLocFilter] = useState<UserLocation | "all">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      navigate("/profile", { replace: true });
    }
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await backend.getUsers();
    setAllUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    return allUsers.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (locFilter !== "all" && u.location !== locFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allUsers, roleFilter, locFilter, search]);

  const stats = useMemo(() => {
    const admins = allUsers.filter((u) => u.role === "admin").length;
    const managers = allUsers.filter((u) => u.role === "manager").length;
    const employees = allUsers.filter((u) => u.role === "employee").length;
    const andorra = allUsers.filter((u) => u.location === "andorra").length;
    const gibraltar = allUsers.filter((u) => u.location === "gibraltar").length;
    return { admins, managers, employees, andorra, gibraltar, total: allUsers.length };
  }, [allUsers]);

  const handleDelete = async (userId: string) => {
    if (!confirm(language === "es" ? "¿Eliminar este usuario?" : "Delete this user?")) return;
    await backend.deleteUser(userId);
    fetchUsers();
  };

  const handleCreate = async (data: backend.SignupData) => {
    await backend.createUser(data);
    fetchUsers();
  };

  if (!isAdmin) return null;

  const pillBase = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border";
  const pillInactive = "border-[#2A2A2A] bg-[#1A1A1A] text-[#8A8A8A]";
  const pillActive = "bg-[#0ABAB5] text-black border-[#0ABAB5]";

  const roleColors: Record<string, string> = {
    admin: "bg-purple-500/20 text-purple-400",
    manager: "bg-[#0ABAB5]/20 text-[#0ABAB5]",
    employee: "bg-[#2A2A2A] text-[#8A8A8A]",
  };

  const RoleIcon = ({ role }: { role: string }) => {
    if (role === "admin") return <Crown size={12} />;
    if (role === "manager") return <Briefcase size={12} />;
    return <User size={12} />;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-4 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-purple-400 uppercase">{language === "es" ? "Panel de Admin" : "Admin Panel"}</p>
          <h1 className="text-xl font-bold">{language === "es" ? "Gestión de Usuarios" : "User Management"}</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAdd(true)} size="sm" className="bg-purple-500 text-white rounded-full px-3">
            <UserPlus className="w-4 h-4" />
          </Button>
          <Button onClick={() => navigate("/profile")} variant="ghost" size="sm" className="text-[#8A8A8A]">{language === "es" ? "Cerrar" : "Close"}</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] text-center">
          <Shield className="w-4 h-4 text-purple-400 mx-auto mb-1" /><span className="text-lg font-bold">{stats.admins}</span>
          <p className="text-[9px] text-[#8A8A8A] uppercase">Admins</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] text-center">
          <Briefcase className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" /><span className="text-lg font-bold">{stats.managers}</span>
          <p className="text-[9px] text-[#8A8A8A] uppercase">Managers</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] text-center">
          <Users className="w-4 h-4 text-[#8A8A8A] mx-auto mb-1" /><span className="text-lg font-bold">{stats.employees}</span>
          <p className="text-[9px] text-[#8A8A8A] uppercase">Employees</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] text-center">
          <MapPin className="w-4 h-4 text-[#F59E0B] mx-auto mb-1" /><span className="text-lg font-bold">{stats.andorra}</span>
          <p className="text-[9px] text-[#8A8A8A] uppercase">Andorra</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] text-center">
          <MapPin className="w-4 h-4 text-[#EF4444] mx-auto mb-1" /><span className="text-lg font-bold">{stats.gibraltar}</span>
          <p className="text-[9px] text-[#8A8A8A] uppercase">Gibraltar</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={language === "es" ? "Buscar usuarios..." : "Search users..."}
          className="pl-10 bg-[#1A1A1A] border-[#2A2A2A] text-white" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setRoleFilter("all")} className={`${pillBase} ${roleFilter === "all" ? pillActive : pillInactive}`}>All</button>
        <button onClick={() => setRoleFilter("admin")} className={`${pillBase} ${roleFilter === "admin" ? pillActive : pillInactive}`}>Admins</button>
        <button onClick={() => setRoleFilter("manager")} className={`${pillBase} ${roleFilter === "manager" ? pillActive : pillInactive}`}>Managers</button>
        <button onClick={() => setRoleFilter("employee")} className={`${pillBase} ${roleFilter === "employee" ? pillActive : pillInactive}`}>Employees</button>
        <div className="w-px h-5 bg-[#2A2A2A] mx-1" />
        <button onClick={() => setLocFilter("all")} className={`${pillBase} ${locFilter === "all" ? pillActive : pillInactive}`}>All Loc</button>
        <button onClick={() => setLocFilter("andorra")} className={`${pillBase} ${locFilter === "andorra" ? pillActive : pillInactive}`}>Andorra</button>
        <button onClick={() => setLocFilter("gibraltar")} className={`${pillBase} ${locFilter === "gibraltar" ? pillActive : pillInactive}`}>Gibraltar</button>
      </div>

      {/* User List */}
      {loading ? (
        <div className="text-center py-12 text-[#8A8A8A]">Loading...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((u) => (
            <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0ABAB5] to-[#008B8B] flex items-center justify-center text-sm font-bold text-black shrink-0">
                {u.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm truncate">{u.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${roleColors[u.role]}`}>
                    <RoleIcon role={u.role} />{u.role}
                  </span>
                </div>
                <p className="text-[11px] text-[#8A8A8A] truncate">{u.email}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-[#8A8A8A]" />
                  <span className="text-[10px] text-[#8A8A8A] capitalize">{u.location}</span>
                </div>
              </div>
              {u.id !== user?.id && (
                <button onClick={() => handleDelete(u.id)} className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              )}
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#8A8A8A]">{language === "es" ? "No se encontraron usuarios" : "No users found"}</div>
          )}
        </div>
      )}

      {/* Add User Modal */}
      {showAdd && <AddUserModal onClose={() => setShowAdd(false)} onAdd={handleCreate} language={language} />}
    </div>
  );
}

function AddUserModal({ onClose, onAdd, language }: { onClose: () => void; onAdd: (data: backend.SignupData) => void; language: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("emp" + Math.floor(Math.random() * 900 + 100));
  const [loc, setLoc] = useState<UserLocation>("andorra");
  const [role, setRole] = useState<UserRole>("employee");

  const canSubmit = name.trim() && email.trim() && password.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd({ email: email.trim(), name: name.trim(), password, role, location: loc });
    onClose();
  };

  const pillBase = "px-4 py-2 rounded-full border text-xs font-semibold transition-all";
  const pillInactive = "border-[#2A2A2A] bg-[#111] text-[#8A8A8A]";
  const pillActive = "border-[#0ABAB5] bg-[#0ABAB5]/10 text-[#0ABAB5]";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70">
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-[#1A1A1A] rounded-t-3xl p-6 w-full max-w-[430px] border-t border-[#2A2A2A] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{language === "es" ? "Añadir Usuario" : "Add User"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#8A8A8A]"><X size={16} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#8A8A8A] mb-1 block">{language === "es" ? "Nombre" : "Name"}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maria Garcia" className="bg-[#111] border-[#2A2A2A] text-white" />
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-1 block">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="maria@zerolines.com" className="bg-[#111] border-[#2A2A2A] text-white" />
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-1 block">{language === "es" ? "Contraseña" : "Password"}</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#111] border-[#2A2A2A] text-white" />
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-2 block">{language === "es" ? "Ubicación" : "Location"}</label>
            <div className="flex gap-2">
              <button onClick={() => setLoc("andorra")} className={`flex-1 ${pillBase} ${loc === "andorra" ? pillActive : pillInactive}`}>Andorra</button>
              <button onClick={() => setLoc("gibraltar")} className={`flex-1 ${pillBase} ${loc === "gibraltar" ? pillActive : pillInactive}`}>Gibraltar</button>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-2 block">Role</label>
            <div className="flex gap-2">
              <button onClick={() => setRole("employee")} className={`flex-1 ${pillBase} ${role === "employee" ? pillActive : pillInactive}`}>Employee</button>
              <button onClick={() => setRole("manager")} className={`flex-1 ${pillBase} ${role === "manager" ? pillActive : pillInactive}`}>Manager</button>
              <button onClick={() => setRole("admin")} className={`flex-1 ${pillBase} ${role === "admin" ? pillActive : pillInactive}`}>Admin</button>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full bg-purple-500 text-white font-semibold h-12 rounded-xl mt-2">
            {language === "es" ? "Crear Usuario" : "Create User"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
