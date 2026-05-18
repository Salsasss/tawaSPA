import { defineStore } from "pinia";
import { login as apiLogin, logout as apiLogout } from "@/services/auth.service";

const SESSION_KEY = "tawa_kitchen_session";

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(employee) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(employee));
  } catch {
    // ignore
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export const useKitchenAuthStore = defineStore("kitchenAuth", {
  state: () => {
    const saved = loadSession();
    return {
      isAuthenticated: !!saved,
      employee: saved, // { name } | null
      loginError: null,
    };
  },

  getters: {
    employeeName: (state) => state.employee?.name ?? "",
    employeeRole: (state) => state.employee?.role ?? "",
  },

  actions: {
    /**
     * Login real contra la API DRF.
     * Usa username/password del formulario KDS.
     * @returns {boolean} true si fue exitoso
     */
    async login(username, password) {
      this.loginError = null;

      try {
        // apiLogin() guarda el token en localStorage automáticamente
        await apiLogin(username.trim(), password);

        // La API devuelve solo el token; guardamos el username como nombre visible
        const employee = { name: username.trim(), role: "staff" };
        this.employee = employee;
        this.isAuthenticated = true;
        saveSession(employee);
        return true;
      } catch (err) {
        const status = err.response?.status;
        if (status === 400 || status === 401) {
          this.loginError = "Usuario o contraseña incorrectos.";
        } else {
          this.loginError = "Error de conexión. Verifica que el servidor esté activo.";
        }
        return false;
      }
    },

    logout() {
      apiLogout(); // Limpia el token del localStorage
      this.isAuthenticated = false;
      this.employee = null;
      this.loginError = null;
      clearSession();
    },
  },
});

