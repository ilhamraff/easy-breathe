import React, { useState, useEffect, useCallback } from "react";
import { FiShield, FiUser, FiSearch } from "react-icons/fi";
import { getAllUsers, updateUserRole } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmRoleModal from "@/admin/components/ConfirmRoleModal";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleTarget, setRoleTarget] = useState(null); // { user, newRole }
  const [updating, setUpdating] = useState(false);
  const { user: currentUser } = useAuth();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      showErrorToast("Gagal memuat daftar pengguna.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users by search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }
    const query = searchQuery.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          (u.firstName || "").toLowerCase().includes(query) ||
          (u.lastName || "").toLowerCase().includes(query) ||
          (u.email || "").toLowerCase().includes(query)
      )
    );
  }, [searchQuery, users]);

  function handleRoleToggle(targetUser) {
    const newRole = targetUser.role === "admin" ? "user" : "admin";
    setRoleTarget({ user: targetUser, newRole });
  }

  async function handleRoleConfirm() {
    if (!roleTarget) return;
    setUpdating(true);
    try {
      await updateUserRole(roleTarget.user.uid, roleTarget.newRole);
      showSuccessToast(
        roleTarget.newRole === "admin"
          ? "Berhasil menambahkan admin baru."
          : "Hak admin berhasil dicabut."
      );
      setRoleTarget(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
      showErrorToast("Gagal mengubah role. Pastikan Anda memiliki izin.");
    } finally {
      setUpdating(false);
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kelola Admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          {users.filter((u) => u.role === "admin").length} admin dari{" "}
          {users.length} pengguna
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FiSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama atau email..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Users list */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-5 py-3.5 font-medium text-slate-500">
                  Pengguna
                </th>
                <th className="hidden px-5 py-3.5 font-medium text-slate-500 sm:table-cell">
                  Email
                </th>
                <th className="px-5 py-3.5 font-medium text-slate-500">
                  Role
                </th>
                <th className="px-5 py-3.5 text-right font-medium text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => {
                const isCurrentUser = u.uid === currentUser?.uid;
                const isAdmin = u.role === "admin";
                return (
                  <tr
                    key={u.uid}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                            isAdmin
                              ? "bg-teal-100 text-teal-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {(u.firstName || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {u.firstName || ""} {u.lastName || ""}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs text-slate-400">
                                (Anda)
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500 sm:hidden">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 text-slate-600 sm:table-cell">
                      {u.email}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          isAdmin
                            ? "bg-teal-50 text-teal-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isAdmin ? (
                          <FiShield size={12} />
                        ) : (
                          <FiUser size={12} />
                        )}
                        {isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {isCurrentUser ? (
                        <span className="text-xs text-slate-400">—</span>
                      ) : (
                        <button
                          onClick={() => handleRoleToggle(u)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            isAdmin
                              ? "text-amber-600 hover:bg-amber-50"
                              : "text-teal-600 hover:bg-teal-50"
                          }`}
                        >
                          {isAdmin ? "Cabut Admin" : "Jadikan Admin"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role change modal */}
      <ConfirmRoleModal
        isOpen={!!roleTarget}
        user={roleTarget?.user}
        newRole={roleTarget?.newRole}
        onConfirm={handleRoleConfirm}
        onCancel={() => setRoleTarget(null)}
        loading={updating}
      />

      <ToastContainer />
    </div>
  );
}

export default AdminUsers;
