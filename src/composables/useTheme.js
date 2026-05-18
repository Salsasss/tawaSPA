import { computed, onMounted, ref } from "vue";

const STORAGE_KEY = "tawa_theme";
const theme = ref("light");

function applyThemeClass(value) {
    const root = document.documentElement;
    root.classList.toggle("dark", value === "dark");
}

function setTheme(value) {
    theme.value = value;
    localStorage.setItem(STORAGE_KEY, value);
    applyThemeClass(value);
}

function toggleTheme() {
    setTheme(theme.value === "dark" ? "light" : "dark");
}

export function useTheme() {
    const isDark = computed(() => theme.value === "dark");

    onMounted(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "dark" || saved === "light") {
            setTheme(saved);
            return;
        }
        // default: respeta preferencia del sistema
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
        setTheme(prefersDark ? "dark" : "light");
    });

    return { theme, isDark, setTheme, toggleTheme };
}