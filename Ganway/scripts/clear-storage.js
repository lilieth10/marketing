// Script para limpiar localStorage y resetear datos de autenticación
console.log("Limpiando localStorage...")

// Limpiar datos de autenticación
localStorage.removeItem("auth-storage")
localStorage.removeItem("users_db")

console.log("localStorage limpiado. Recarga la página para ver los cambios.")
