# =============================================================================
# scripts/publish_public.ps1 - Sincronización Segura PrivaStream
# GitLab (Completo/Privado) -> GitHub (Público/Sanitizado)
# =============================================================================

Write-Host "[*] Iniciando sincronización profesional DevSecOps..." -ForegroundColor Cyan

# 1. Pre-vuelo
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Host "[!] Error: Debes estar en 'main' para publicar." -ForegroundColor Red
    exit
}

if (git status --porcelain) {
    Write-Host "[!] Tienes cambios sin guardar. Haz commit antes de publicar." -ForegroundColor Yellow
    exit
}

# 2. Sincronización Privada
Write-Host "[*] Asegurando estado en GitLab (Laboratorio Principal)..."
git pull gitlab main --rebase
git push gitlab main

# 3. Rama Pública (Aislamiento)
Write-Host "[*] Creando release sanitizado en rama 'public'..."
git checkout -B public main

# 4. Filtrado de Archivos (Datos que no deben exponerse)
Write-Host "[*] Aplicando filtros de seguridad..." -ForegroundColor Cyan
git rm -r --cached tests/ -f 2>$null
git rm -r --cached config/ -f 2>$null
git rm -r --cached scripts/ -f 2>$null
git rm --cached docs/architecture.md -f 2>$null
git rm --cached .gitlab-ci.yml -f 2>$null

# 5. Commit & Push Público
git commit -m "docs: release update to public portfolio (sanitized)" --allow-empty
Write-Host "[*] Subiendo a GitHub origin (Sanitizado)..." -ForegroundColor Green
git push origin public:main --force

# 6. Retorno Seguro
Write-Host "[*] Volviendo al Laboratorio..."
git checkout main -f
git clean -fd 2>$null

Write-Host "[*] Portafolio actualizado y entorno privado protegido." -ForegroundColor Green
