// Script para limpiar el localStorage y forzar la recarga de datos
if (typeof window !== "undefined") {
  localStorage.removeItem("post-storage")
  console.log("Storage cleared! Please refresh the page.")
}
