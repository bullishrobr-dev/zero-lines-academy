import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, TrendingUp, Award, AlertTriangle, ArrowLeft, MapPin, UserPlus, X, MessageSquare, Send, BookOpen, Star, FileText, Zap, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as backend from "../backend/mockBackend";
import type { UserLocation } from "../backend/types";

/* ── Types ── */
interface EmployeeProgress {
  user: { id: string; name: string; email: string; location: UserLocation; role: string; managerId?: string; createdAt: string };
  progress: number;
  streak: number;
  avgScore: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
}

/* ── Helpers ── */
function getStatus(p: number): { label: string; labelEs: string; color: string } {
  if (p >= 70) return { label: "On Track", labelEs: "En Buen Camino", color: "bg-[#4ADE80]" };
  if (p >= 40) return { label: "Needs Push", labelEs: "Necesita Empuje", color: "bg-[#FBBF24]" };
  return { label: "At Risk", labelEs: "En Riesgo", color: "bg-[#F87171]" };
}

/* ── Coaching Note Type ── */
interface CoachingNote {
  id: string;
  employeeId: string;
  employeeName: string;
  text: string;
  createdAt: string;
}

/* ── localStorage helpers ── */
function getCoachingNotes(): CoachingNote[] {
  try { return JSON.parse(localStorage.getItem("zl_coaching_notes") || "[]"); } catch { return []; }
}
function saveCoachingNote(note: CoachingNote) {
  const notes = getCoachingNotes();
  notes.unshift(note);
  localStorage.setItem("zl_coaching_notes", JSON.stringify(notes.slice(0, 200)));
}
function getTeamNudges(): { text: string; sentAt: string; sender: string }[] {
  try { return JSON.parse(localStorage.getItem("zl_team_nudges") || "[]"); } catch { return []; }
}
function saveTeamNudge(nudge: { text: string; sentAt: string; sender: string }) {
  const nudges = getTeamNudges();
  nudges.unshift(nudge);
  localStorage.setItem("zl_team_nudges", JSON.stringify(nudges.slice(0, 50)));
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, value, label, labelEs, delay }: { icon: any; value: string; label: string; labelEs: string; delay: number }) {
  const { language } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2A2A2A] flex flex-col items-center text-center"
    >
      <Icon className="w-5 h-5 text-[#0ABAB5] mb-1" />
      <span className="text-lg font-bold">{value}</span>
      <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{language === "es" ? labelEs : label}</span>
    </motion.div>
  );
}

/* ── Employee Card ── */
function EmployeeCard({ emp, language, onClick, onNudge, onAssignLesson, onAwardXP, onAddNote }: {
  emp: EmployeeProgress; language: string; onClick: () => void;
  onNudge: (e: React.MouseEvent) => void;
  onAssignLesson: (e: React.MouseEvent) => void;
  onAwardXP: (e: React.MouseEvent) => void;
  onAddNote: (e: React.MouseEvent) => void;
}) {
  const status = getStatus(emp.progress);
  const btnBase = "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all border";
  return (
    <motion.div
      layout
      className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A] cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div onClick={onClick}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0ABAB5] to-[#008B8B] flex items-center justify-center text-sm font-bold text-black">
            {emp.user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{emp.user.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${status.color}`} />
              <span className="text-[10px] text-[#8A8A8A]">{language === "es" ? status.labelEs : status.label}</span>
            </div>
          </div>
          <MapPin className="w-3.5 h-3.5 text-[#8A8A8A] flex-shrink-0" />
          <span className="text-[10px] text-[#8A8A8A] capitalize">{emp.user.location}</span>
        </div>
        <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden mb-2">
          <motion.div className="h-full rounded-full bg-[#0ABAB5]" initial={{ width: 0 }} animate={{ width: `${emp.progress}%` }} transition={{ duration: 0.8 }} />
        </div>
        <div className="flex justify-between text-[10px] text-[#8A8A8A] mb-3">
          <span>{language === "es" ? "Progreso" : "Progress"}: {emp.progress}%</span>
          <span>{language === "es" ? "Racha" : "Streak"}: {emp.streak}d</span>
          <span>Quiz: {emp.avgScore.toFixed(1)}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-1.5 flex-wrap" onClick={e => e.stopPropagation()}>
        <button onClick={onNudge} className={`${btnBase} bg-[#0ABAB5]/10 border-[#0ABAB5]/30 text-[#0ABAB5] hover:bg-[#0ABAB5]/20`}>
          <MessageSquare className="w-3 h-3" />{language === "es" ? "Empujar" : "Nudge"}
        </button>
        <button onClick={onAssignLesson} className={`${btnBase} bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6]/20`}>
          <BookOpen className="w-3 h-3" />{language === "es" ? "Asignar" : "Assign"}
        </button>
        <button onClick={onAwardXP} className={`${btnBase} bg-[#FBBF24]/10 border-[#FBBF24]/30 text-[#FBBF24] hover:bg-[#FBBF24]/20`}>
          <Star className="w-3 h-3" />XP
        </button>
        <button onClick={onAddNote} className={`${btnBase} bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/20`}>
          <FileText className="w-3 h-3" />{language === "es" ? "Nota" : "Note"}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Add Employee Modal ── */
function AddEmployeeModal({ onClose, onAdd, locationFilter }: { onClose: () => void; onAdd: (data: backend.SignupData) => void; locationFilter: UserLocation }) {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("emp" + Math.floor(Math.random() * 900 + 100));
  const [loc, setLoc] = useState<UserLocation>(locationFilter === 'andorra' || locationFilter === 'gibraltar' ? locationFilter : 'andorra');
  const [role, setRole] = useState<'employee' | 'manager'>('employee');

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
          <h2 className="text-lg font-bold text-white">{language === "es" ? "Añadir Empleado" : "Add Employee"}</h2>
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
            <label className="text-xs text-[#8A8A8A] mb-1 block">{language === "es" ? "Contraseña temporal" : "Temporary Password"}</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#111] border-[#2A2A2A] text-white" />
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-2 block">{language === "es" ? "Ubicación" : "Location"}</label>
            <div className="flex gap-2">
              <button onClick={() => setLoc('andorra')} className={`flex-1 ${pillBase} ${loc === 'andorra' ? pillActive : pillInactive}`}>Andorra</button>
              <button onClick={() => setLoc('gibraltar')} className={`flex-1 ${pillBase} ${loc === 'gibraltar' ? pillActive : pillInactive}`}>Gibraltar</button>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#8A8A8A] mb-2 block">Role</label>
            <div className="flex gap-2">
              <button onClick={() => setRole('employee')} className={`flex-1 ${pillBase} ${role === 'employee' ? pillActive : pillInactive}`}>Employee</button>
              <button onClick={() => setRole('manager')} className={`flex-1 ${pillBase} ${role === 'manager' ? pillActive : pillInactive}`}>Manager</button>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full bg-[#0ABAB5] text-black font-semibold h-12 rounded-xl mt-2">
            {language === "es" ? "Crear Usuario" : "Create User"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Employee Detail ── */
function EmployeeDetail({ emp, language, onBack }: { emp: EmployeeProgress; language: string; onBack: () => void }) {
  const status = getStatus(emp.progress);
  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="min-h-screen bg-[#0A0A0A] text-white px-4 pt-6 pb-24">
      <Button onClick={onBack} variant="ghost" className="text-[#8A8A8A] mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-1" />{language === "es" ? "Volver" : "Back"}
      </Button>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0ABAB5] to-[#008B8B] flex items-center justify-center text-xl font-bold text-black">
          {emp.user.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <h2 className="text-xl font-bold">{emp.user.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
            <span className="text-sm text-[#8A8A8A]">{language === "es" ? status.labelEs : status.label}</span>
            <MapPin className="w-3.5 h-3.5 text-[#8A8A8A] ml-2" />
            <span className="text-sm text-[#8A8A8A] capitalize">{emp.user.location}</span>
          </div>
          <p className="text-xs text-[#8A8A8A] mt-1">{emp.user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"><p className="text-2xl font-bold">{emp.progress}%</p><p className="text-[11px] text-[#8A8A8A]">{language === "es" ? "Completado" : "Completed"}</p></div>
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"><p className="text-2xl font-bold">{emp.completedLessons}/{emp.totalLessons}</p><p className="text-[11px] text-[#8A8A8A]">{language === "es" ? "Lecciones" : "Lessons"}</p></div>
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"><p className="text-2xl font-bold">{emp.streak}d</p><p className="text-[11px] text-[#8A8A8A]">{language === "es" ? "Racha Actual" : "Current Streak"}</p></div>
        <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]"><p className="text-2xl font-bold">{emp.avgScore.toFixed(1)}</p><p className="text-[11px] text-[#8A8A8A]">{language === "es" ? "Promedio Quiz" : "Quiz Avg"}</p></div>
      </div>
      <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A]">
        <p className="text-[11px] text-[#8A8A8A] uppercase tracking-wider mb-2">{language === "es" ? "Miembro desde" : "Member since"}</p>
        <p className="text-sm">{new Date(emp.user.createdAt).toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
}

/* ── Coaching Notes Modal ── */
function CoachingNotesModal({ emp, language, onClose }: { emp: EmployeeProgress; language: string; onClose: () => void }) {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<CoachingNote[]>(() => getCoachingNotes().filter(n => n.employeeId === emp.user.id));

  const handleSave = () => {
    if (!text.trim()) return;
    const note: CoachingNote = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      employeeId: emp.user.id,
      employeeName: emp.user.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    saveCoachingNote(note);
    setNotes(prev => [note, ...prev]);
    setText("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70">
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-[#1A1A1A] rounded-t-3xl p-6 w-full max-w-[430px] border-t border-[#2A2A2A] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{language === "es" ? "Notas de Coaching" : "Coaching Notes"}</h2>
            <p className="text-xs text-[#8A8A8A]">{emp.user.name}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#8A8A8A]"><X size={16} /></button>
        </div>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={language === "es" ? "Escribe una nota de coaching..." : "Write a coaching note..."}
            className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl p-3 text-sm text-white placeholder-[#5A5A5A] resize-none focus:outline-none focus:border-[#0ABAB5] min-h-[80px]"
          />
          <button onClick={handleSave} disabled={!text.trim()} className="w-full bg-[#8B5CF6] text-white font-semibold py-2.5 rounded-xl text-sm mt-2 disabled:opacity-40">
            {language === "es" ? "Guardar Nota" : "Save Note"}
          </button>
        </div>
        {notes.length > 0 && (
          <div>
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider mb-2">{language === "es" ? "Notas anteriores" : "Previous Notes"}</p>
            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {notes.map(n => (
                <div key={n.id} className="bg-[#111] rounded-lg p-3 border border-[#2A2A2A]">
                  <p className="text-xs text-white">{n.text}</p>
                  <p className="text-[10px] text-[#5A5A5A] mt-1">{new Date(n.createdAt).toLocaleString(language === "es" ? "es-ES" : "en-US")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Team Nudge Modal ── */
function TeamNudgeModal({ language, senderName, onClose }: { language: string; senderName: string; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const presets = [
    { en: "Great morning everyone! Let's crush those stops! 🔥", es: "¡Buenos días a todos! ¡A romper esas paradas! 🔥" },
    { en: "Don't forget your daily dose! 📚", es: "¡No olviden su dosis diaria! 📚" },
    { en: "End of shift — reflect on your day! ✍️", es: "Fin de turno — ¡reflexionen sobre su día! ✍️" },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    saveTeamNudge({ text: text.trim(), sentAt: new Date().toISOString(), sender: senderName });
    setSent(true);
    setTimeout(() => onClose(), 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70">
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-[#1A1A1A] rounded-t-3xl p-6 w-full max-w-[430px] border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{language === "es" ? "Enviar Empujón al Equipo" : "Send Team Nudge"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#8A8A8A]"><X size={16} /></button>
        </div>
        {sent ? (
          <div className="text-center py-8">
            <Send className="w-10 h-10 text-[#4ADE80] mx-auto mb-3" />
            <p className="text-sm text-white font-semibold">{language === "es" ? "¡Mensaje enviado!" : "Nudge sent!"}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#8A8A8A] mb-3">{language === "es" ? "Mensajes predefinidos:" : "Quick nudges:"}</p>
            <div className="space-y-2 mb-4">
              {presets.map((p, i) => (
                <button key={i} onClick={() => handleSend(language === "es" ? p.es : p.en)} className="w-full text-left bg-[#111] border border-[#2A2A2A] rounded-xl p-3 text-xs text-white hover:border-[#0ABAB5]/50 hover:bg-[#0ABAB5]/5 transition-all">
                  {language === "es" ? p.es : p.en}
                </button>
              ))}
            </div>
            <div className="border-t border-[#2A2A2A] pt-4">
              <label className="text-xs text-[#8A8A8A] mb-1 block">{language === "es" ? "Mensaje personalizado:" : "Custom message:"}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === "es" ? "Escribe tu mensaje..." : "Type your message..."}
                className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl p-3 text-sm text-white placeholder-[#5A5A5A] resize-none focus:outline-none focus:border-[#0ABAB5] min-h-[60px]"
              />
              <button onClick={() => handleSend(message)} disabled={!message.trim()} className="w-full bg-[#0ABAB5] text-black font-semibold py-2.5 rounded-xl text-sm mt-2 disabled:opacity-40">
                <Send className="w-3.5 h-3.5 inline mr-1" />{language === "es" ? "Enviar a Todo el Equipo" : "Send to Whole Team"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ── Coaching Queue Modal ── */
function CoachingQueueModal({ employees, language, onClose, onSchedule }: { employees: (EmployeeProgress & { reason: string; reasonEs: string; daysSinceActive: number })[]; language: string; onClose: () => void; onSchedule: (emp: EmployeeProgress) => void }) {
  const [scheduledId, setScheduledId] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70">
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-[#1A1A1A] rounded-t-3xl p-6 w-full max-w-[430px] border-t border-[#2A2A2A] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{language === "es" ? "Cola de Coaching" : "Coaching Queue"}</h2>
            <p className="text-xs text-[#8A8A8A]">{employees.length} {language === "es" ? "empleados necesitan atención" : "employees need attention"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#8A8A8A]"><X size={16} /></button>
        </div>
        {employees.length === 0 ? (
          <div className="text-center py-8 text-[#8A8A8A] text-sm">{language === "es" ? "¡Todo bien! Nadie necesita coaching ahora mismo." : "All good! No one needs coaching right now."}</div>
        ) : (
          <div className="space-y-3">
            {employees.map(emp => (
              <div key={emp.user.id} className="bg-[#111] rounded-xl p-3 border border-[#2A2A2A]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F87171] to-[#DC2626] flex items-center justify-center text-xs font-bold text-black">
                      {emp.user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{emp.user.name}</p>
                      <p className="text-[10px] text-[#F87171]">{language === "es" ? emp.reasonEs : emp.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-[#8A8A8A]">
                    <Clock className="w-3 h-3" />
                    <span>{language === "es" ? "Últ. activo:" : "Last active:"} {new Date(emp.lastActive).toLocaleDateString()}</span>
                  </div>
                  {scheduledId === emp.user.id ? (
                    <span className="text-[10px] text-[#4ADE80] font-semibold">{language === "es" ? "¡Programado!" : "Scheduled!"}</span>
                  ) : (
                    <button onClick={() => { setScheduledId(emp.user.id); onSchedule(emp); }} className="px-3 py-1.5 rounded-lg bg-[#0ABAB5]/10 border border-[#0ABAB5]/30 text-[#0ABAB5] text-[10px] font-semibold hover:bg-[#0ABAB5]/20 transition-colors">
                      {language === "es" ? "Programar 10 min" : "Schedule 10-min"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── Toast notification helper ── */
function useToast() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const show = (message: string) => { setToast({ message, visible: true }); setTimeout(() => setToast({ message: "", visible: false }), 2200); };
  const ToastEl = toast.visible ? (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-20 left-0 right-0 z-[70] flex justify-center px-4 pointer-events-none">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg">{toast.message}</div>
    </motion.div>
  ) : null;
  return { ToastEl, show };
}

/* ── Main Dashboard ── */
export default function ManagerDashboard() {
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selectedEmp, setSelectedEmp] = useState<EmployeeProgress | null>(null);
  const [locationFilter, setLocationFilter] = useState<"all" | UserLocation>(user?.location || "all");
  const [team, setTeam] = useState<EmployeeProgress[]>([]);
  const [stats, setStats] = useState({ total: 0, avgProgress: 0, top: "-", atRisk: 0 });
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCoachingNotes, setShowCoachingNotes] = useState<EmployeeProgress | null>(null);
  const [showTeamNudge, setShowTeamNudge] = useState(false);
  const [showCoachingQueue, setShowCoachingQueue] = useState(false);
  const [showAssignLesson, setShowAssignLesson] = useState<EmployeeProgress | null>(null);
  const [assignLessonVal, setAssignLessonVal] = useState("");
  const toast = useToast();

  const fetchTeam = async () => {
    if (!user) return;
    setLoading(true);
    const data = await backend.getTeamProgress(user.id);
    setTeam(data);
    const s = await backend.getTeamStats(user.id);
    setStats({ total: s.totalEmployees, avgProgress: s.avgCompletion, top: s.topPerformer, atRisk: s.atRiskCount });
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, [user]);

  const employees = useMemo(() => {
    if (locationFilter === "all") return team;
    return team.filter(e => e.user.location === locationFilter);
  }, [team, locationFilter]);

  const coachingQueue = useMemo(() => {
    return employees.filter(emp => {
      const daysSinceActive = Math.floor((Date.now() - new Date(emp.lastActive).getTime()) / 86400000);
      return emp.progress < 30 || daysSinceActive >= 3 || emp.avgScore < 50 || emp.streak === 0;
    }).map(emp => {
      const daysSinceActive = Math.floor((Date.now() - new Date(emp.lastActive).getTime()) / 86400000);
      let reason = "";
      let reasonEs = "";
      if (emp.progress < 30) { reason = "Low progress"; reasonEs = "Progreso bajo"; }
      else if (daysSinceActive >= 3) { reason = `No activity for ${daysSinceActive} days`; reasonEs = `Sin actividad por ${daysSinceActive} días`; }
      else if (emp.avgScore < 50) { reason = "Low quiz scores"; reasonEs = "Puntuaciones bajas"; }
      else { reason = "Streak broken"; reasonEs = "Racha rota"; }
      return { ...emp, reason, reasonEs, daysSinceActive };
    });
  }, [employees]);

  const handleAddEmployee = async (data: backend.SignupData) => {
    await backend.createUser(data);
    fetchTeam();
  };

  const handleNudge = (emp: EmployeeProgress) => {
    toast.show(language === "es" ? `Empujón enviado a ${emp.user.name} 👋` : `Nudge sent to ${emp.user.name} 👋`);
  };
  const handleAwardXP = (emp: EmployeeProgress) => {
    toast.show(language === "es" ? `+20 XP para ${emp.user.name} ⭐` : `+20 XP awarded to ${emp.user.name} ⭐`);
  };
  const handleAssignLessonSave = () => {
    if (!assignLessonVal.trim() || !showAssignLesson) return;
    toast.show(language === "es" ? `Lección asignada a ${showAssignLesson.user.name} 📚` : `Lesson assigned to ${showAssignLesson.user.name} 📚`);
    setAssignLessonVal("");
    setShowAssignLesson(null);
  };

  if (selectedEmp) {
    return <EmployeeDetail emp={selectedEmp} language={language} onBack={() => setSelectedEmp(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-4 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-[#0ABAB5] uppercase">{language === "es" ? "Panel del Manager" : "Manager Dashboard"}</p>
          <h1 className="text-xl font-bold">{language === "es" ? "Tu Equipo" : "Your Team"}</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAdd(true)} size="sm" className="bg-[#0ABAB5] text-black rounded-full px-3">
            <UserPlus className="w-4 h-4" />
          </Button>
          <Button onClick={() => navigate("/profile")} variant="ghost" size="sm" className="text-[#8A8A8A]">{language === "es" ? "Cerrar" : "Close"}</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <StatCard icon={Users} value={String(stats.total)} label="Employees" labelEs="Empleados" delay={0} />
        <StatCard icon={TrendingUp} value={`${stats.avgProgress}%`} label="Avg Done" labelEs="Prom Completado" delay={0.1} />
        <StatCard icon={Award} value={stats.top} label="Top" labelEs="Mejor" delay={0.2} />
        <StatCard icon={AlertTriangle} value={String(stats.atRisk)} label="At Risk" labelEs="En Riesgo" delay={0.3} />
      </div>

      {/* Daily Digest Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-br from-[#1A1A1A] to-[#1A1A1A]/80 rounded-xl p-4 border border-[#2A2A2A] mb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-[#0ABAB5] uppercase">{language === "es" ? "Resumen Diario" : "Daily Digest"}</p>
            <p className="text-xs text-[#8A8A8A]">{new Date().toLocaleDateString(language === "es" ? "es-ES" : "en-US", { weekday: "long", month: "long", day: "numeric" })} — {language === "es" ? "Resumen de hoy" : "Today's Overview"}</p>
          </div>
          <Calendar className="w-5 h-5 text-[#0ABAB5]" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[#111] rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-[#4ADE80]">{employees.filter(e => new Date(e.lastActive).toDateString() === new Date().toDateString()).length}</p>
            <p className="text-[9px] text-[#8A8A8A]">{language === "es" ? "Check-ins hoy" : "Checked in"}</p>
          </div>
          <div className="bg-[#111] rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-[#0ABAB5]">{employees.filter(e => e.progress > 0).length}</p>
            <p className="text-[9px] text-[#8A8A8A]">{language === "es" ? "Dosis diaria" : "Daily dose done"}</p>
          </div>
          <div className="bg-[#111] rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-[#F87171]">{coachingQueue.length}</p>
            <p className="text-[9px] text-[#8A8A8A]">{language === "es" ? "Necesitan coaching" : "Need coaching"}</p>
          </div>
        </div>
        <div className="bg-[#111] rounded-lg p-2.5 mb-3 flex items-start gap-2">
          <Award className="w-4 h-4 text-[#FBBF24] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{language === "es" ? "Victoria de ayer" : "Yesterday's Win"}</p>
            <p className="text-xs text-white mt-0.5">{language === "es" ? "¡María trajo a 15 personas — su mejor marca personal!" : "Maria brought in 15 people — her personal best!"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTeamNudge(true)} className="flex-1 bg-[#0ABAB5]/10 border border-[#0ABAB5]/30 text-[#0ABAB5] rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#0ABAB5]/20 transition-colors">
            <Send className="w-3.5 h-3.5" />{language === "es" ? "Enviar Empujón" : "Send Team Nudge"}
          </button>
          <button onClick={() => setShowCoachingQueue(true)} className="flex-1 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F87171]/20 transition-colors">
            <Zap className="w-3.5 h-3.5" />{language === "es" ? "Ver Cola Coaching" : "View Coaching Queue"}
          </button>
        </div>
      </motion.div>

      {/* Location Filter */}
      <div className="flex gap-2 mb-4">
        {(["all", "gibraltar", "andorra"] as const).map((loc) => (
          <button key={loc} onClick={() => setLocationFilter(loc)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${locationFilter === loc ? "bg-[#0ABAB5] text-black" : "bg-[#1A1A1A] text-[#8A8A8A] border border-[#2A2A2A]"}`}>
            {loc === "all" ? (language === "es" ? "Todos" : "All") : loc.charAt(0).toUpperCase() + loc.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#8A8A8A]">{language === "es" ? "Cargando..." : "Loading..."}</div>
      ) : (
        <div className="space-y-3">
          {employees.map((emp, i) => (
            <motion.div key={emp.user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <EmployeeCard
                emp={emp}
                language={language}
                onClick={() => setSelectedEmp(emp)}
                onNudge={(e) => { e.stopPropagation(); handleNudge(emp); }}
                onAssignLesson={(e) => { e.stopPropagation(); setShowAssignLesson(emp); }}
                onAwardXP={(e) => { e.stopPropagation(); handleAwardXP(emp); }}
                onAddNote={(e) => { e.stopPropagation(); setShowCoachingNotes(emp); }}
              />
            </motion.div>
          ))}
          {employees.length === 0 && (
            <div className="text-center py-12 text-[#8A8A8A]">{language === "es" ? "No hay empleados" : "No employees found"}</div>
          )}
        </div>
      )}

      {/* Coaching Queue Section */}
      {coachingQueue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white">{language === "es" ? "Cola de Coaching" : "Coaching Queue"}</h2>
            <span className="text-[10px] text-[#F87171] bg-[#F87171]/10 px-2 py-0.5 rounded-full font-semibold">{coachingQueue.length} {language === "es" ? "necesitan atención" : "need attention"}</span>
          </div>
          <div className="space-y-2">
            {coachingQueue.slice(0, 3).map(emp => (
              <div key={emp.user.id} className="bg-[#1A1A1A] rounded-xl p-3 border border-[#F87171]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F87171] to-[#DC2626] flex items-center justify-center text-xs font-bold text-black flex-shrink-0">
                    {emp.user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{emp.user.name}</p>
                    <p className="text-[10px] text-[#F87171] truncate">{language === "es" ? emp.reasonEs : emp.reason}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowCoachingNotes(emp); }}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#0ABAB5]/10 border border-[#0ABAB5]/30 text-[#0ABAB5] text-[10px] font-semibold hover:bg-[#0ABAB5]/20 transition-colors ml-2"
                >
                  {language === "es" ? "Programar 10 min" : "Schedule 10-min"}
                </button>
              </div>
            ))}
          </div>
          {coachingQueue.length > 3 && (
            <button onClick={() => setShowCoachingQueue(true)} className="w-full text-center text-xs text-[#0ABAB5] mt-2 py-2 hover:underline">
              {language === "es" ? `Ver todos (${coachingQueue.length})` : `View all ${coachingQueue.length}`}
            </button>
          )}
        </motion.div>
      )}

      {/* Modals */}
      {showAdd && <AddEmployeeModal onClose={() => setShowAdd(false)} onAdd={handleAddEmployee} locationFilter={locationFilter as UserLocation} />}
      {showCoachingNotes && <CoachingNotesModal emp={showCoachingNotes} language={language} onClose={() => setShowCoachingNotes(null)} />}
      {showTeamNudge && <TeamNudgeModal language={language} senderName={user?.name || "Manager"} onClose={() => setShowTeamNudge(false)} />}
      {showCoachingQueue && <CoachingQueueModal employees={coachingQueue} language={language} onClose={() => setShowCoachingQueue(false)} onSchedule={(emp) => setShowCoachingNotes(emp)} />}

      {/* Assign Lesson Modal */}
      {showAssignLesson && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70">
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-[#1A1A1A] rounded-t-3xl p-6 w-full max-w-[430px] border-t border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">{language === "es" ? "Asignar Lección" : "Assign Lesson"}</h2>
                <p className="text-xs text-[#8A8A8A]">{showAssignLesson.user.name}</p>
              </div>
              <button onClick={() => setShowAssignLesson(null)} className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#8A8A8A]"><X size={16} /></button>
            </div>
            <label className="text-xs text-[#8A8A8A] mb-2 block">{language === "es" ? "Seleccionar lección:" : "Select lesson:"}</label>
            <select
              value={assignLessonVal}
              onChange={(e) => setAssignLessonVal(e.target.value)}
              className="w-full bg-[#111] border border-[#2A2A2A] rounded-xl p-3 text-sm text-white mb-4 focus:outline-none focus:border-[#0ABAB5]"
            >
              <option value="">{language === "es" ? "-- Seleccionar --" : "-- Select --"}</option>
              <option value="lesson-greeting">{language === "es" ? "Saludo al Cliente" : "Greeting the Customer"}</option>
              <option value="lesson-upsell">{language === "es" ? "Técnicas de Upsell" : "Upselling Techniques"}</option>
              <option value="lesson-difficult">{language === "es" ? "Clientes Difíciles" : "Dealing with Difficult Customers"}</option>
              <option value="lesson-product">{language === "es" ? "Conocimiento de Producto" : "Product Knowledge"}</option>
              <option value="lesson-closing">{language === "es" ? "Cierre de Venta" : "Closing the Sale"}</option>
            </select>
            <button onClick={handleAssignLessonSave} disabled={!assignLessonVal} className="w-full bg-[#3B82F6] text-white font-semibold py-2.5 rounded-xl text-sm disabled:opacity-40">
              {language === "es" ? "Asignar Lección" : "Assign Lesson"}
            </button>
          </motion.div>
        </div>
      )}

      {/* Toast */}
      {toast.ToastEl}
    </div>
  );
}
