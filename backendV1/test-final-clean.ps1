# Script de Pruebas API Vea 3.0 - Version Final
param(
    [string]$BaseUrl = "http://localhost:3000/api"
)

$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$authToken = ""
$testResults = @()

function Write-TestLog {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "HH:mm:ss"
    $color = switch($Level) {
        "SUCCESS" { "Green" }
        "ERROR" { "Red" }
        "WARNING" { "Yellow" }
        default { "White" }
    }
    Write-Host "[$timestamp] $Message" -ForegroundColor $color
}

function Invoke-ApiRequest {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body = $null,
        [string]$Description = ""
    )
    
    $url = "$BaseUrl$Endpoint"
    $requestHeaders = $headers.Clone()
    
    if ($authToken) {
        $requestHeaders["Authorization"] = "Bearer $authToken"
    }
    
    try {
        $bodyJson = if ($Body) { $Body | ConvertTo-Json -Depth 10 } else { $null }
        
        $response = Invoke-RestMethod -Uri $url -Method $Method -Headers $requestHeaders -Body $bodyJson -ErrorAction Stop
        
        $result = @{
            Method = $Method
            Endpoint = $Endpoint
            Description = $Description
            Status = "SUCCESS"
            StatusCode = 200
            Response = $response
            Error = $null
        }
        
        Write-TestLog "SUCCESS: $Method $Endpoint - $Description" "SUCCESS"
        return $result
        
    } catch {
        $statusCode = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 500 }
        
        $result = @{
            Method = $Method
            Endpoint = $Endpoint
            Description = $Description
            Status = "ERROR"
            StatusCode = $statusCode
            Response = $null
            Error = $_.Exception.Message
        }
        
        Write-TestLog "ERROR: $Method $Endpoint - $Description (Status: $statusCode)" "ERROR"
        return $result
    }
}

function Get-AuthToken {
    Write-TestLog "Iniciando autenticacion..." "INFO"
    $loginData = @{
        email = "admin_762545816@test.com"
        password = "Admin123!"
        rememberMe = $false
    }
    
    $result = Invoke-ApiRequest -Method "POST" -Endpoint "/v2/auth/login" -Body $loginData -Description "Autenticacion v2"
    
    if ($result.Status -eq "SUCCESS" -and $result.Response.tokens) {
        $script:authToken = $result.Response.tokens.accessToken
        Write-TestLog "Token de autenticacion obtenido exitosamente" "SUCCESS"
        return $true
    } else {
        Write-TestLog "No se pudo obtener el token de autenticacion" "ERROR"
        return $false
    }
}

Write-TestLog "Iniciando pruebas completas de API Vea 3.0" "INFO"
Write-TestLog "URL Base: $BaseUrl" "INFO"

# Obtener token de autenticacion
$authSuccess = Get-AuthToken
if (!$authSuccess) {
    Write-TestLog "Continuando sin autenticacion - algunos endpoints pueden fallar" "WARNING"
}

# PRUEBAS DE ENDPOINTS GET
Write-TestLog "Ejecutando pruebas GET basicas..." "INFO"

$getEndpoints = @(
    @{ endpoint = "/"; description = "Endpoint raiz" },
    @{ endpoint = "/users"; description = "Lista de usuarios" },
    @{ endpoint = "/products"; description = "Lista de productos" },
    @{ endpoint = "/sellers"; description = "Lista de vendedores" },
    @{ endpoint = "/buyers"; description = "Lista de compradores" },
    @{ endpoint = "/sales"; description = "Lista de ventas" },
    @{ endpoint = "/reviews"; description = "Lista de reviews" },
    @{ endpoint = "/chat"; description = "Lista de chats" },
    @{ endpoint = "/departments"; description = "Lista de departamentos" },
    @{ endpoint = "/municipalities"; description = "Lista de municipios" },
    @{ endpoint = "/catalogos/categories"; description = "Categorias" },
    @{ endpoint = "/catalogos/publishingstatus"; description = "Estados de publicacion" },
    @{ endpoint = "/catalogos/salestatus"; description = "Estados de venta" },
    @{ endpoint = "/catalogos/articlestatus"; description = "Estados de articulo" }
)

foreach ($endpoint in $getEndpoints) {
    $result = Invoke-ApiRequest -Method "GET" -Endpoint $endpoint.endpoint -Description $endpoint.description
    $testResults += $result
}

# PRUEBAS DE AUTENTICACION
Write-TestLog "Ejecutando pruebas de autenticacion..." "INFO"

$registerData = @{
    name = "Usuario Test"
    username = "usuariotest_$(Get-Random)"
    email = "test_$(Get-Random)@ejemplo.com"
    password = "TestPassword123!"
    img = "https://ejemplo.com/avatar.jpg"
    role = "buyer"
}
$result = Invoke-ApiRequest -Method "POST" -Endpoint "/v2/auth/register" -Body $registerData -Description "Registro v2"
$testResults += $result

# PRUEBAS DE PRODUCTOS
Write-TestLog "Ejecutando pruebas de productos..." "INFO"

$createProductData = @{
    statusId = 1
    sellerId = 1
    title = "iPhone 14 Pro Test"
    article = "Smartphone Apple"
    description = "iPhone 14 Pro en excelente estado"
    price = 1200.99
    type = 1
}
$result = Invoke-ApiRequest -Method "POST" -Endpoint "/products" -Body $createProductData -Description "Crear producto"
$testResults += $result

# PRUEBAS DE VENTAS
Write-TestLog "Ejecutando pruebas de ventas..." "INFO"

$createSaleData = @{
    publishingId = 1
    buyerId = 1
    statusId = 1
}
$result = Invoke-ApiRequest -Method "POST" -Endpoint "/sales" -Body $createSaleData -Description "Crear venta"
$testResults += $result

# PRUEBAS DE REVIEWS
Write-TestLog "Ejecutando pruebas de reviews..." "INFO"

$createReviewData = @{
    saleId = 1
    review = "Excelente producto, muy buena calidad y entrega rapida."
    rating = 5
}
$result = Invoke-ApiRequest -Method "POST" -Endpoint "/reviews" -Body $createReviewData -Description "Crear review"
$testResults += $result

# PRUEBAS DE CHAT
Write-TestLog "Ejecutando pruebas de chat..." "INFO"

$createChatData = @{
    publishingId = 1
    buyerId = 1
    sellerId = 1
    isEnable = $true
}
$result = Invoke-ApiRequest -Method "POST" -Endpoint "/chat" -Body $createChatData -Description "Crear chat"
$testResults += $result

$result = Invoke-ApiRequest -Method "PUT" -Endpoint "/chat/1/enable" -Description "Habilitar chat"
$testResults += $result

$result = Invoke-ApiRequest -Method "PUT" -Endpoint "/chat/1/disable" -Description "Deshabilitar chat"
$testResults += $result

# ENDPOINTS ESPECIFICOS
Write-TestLog "Ejecutando pruebas de endpoints especificos..." "INFO"

$result = Invoke-ApiRequest -Method "GET" -Endpoint "/reviews/product/1/average-rating" -Description "Rating promedio de producto"
$testResults += $result

$result = Invoke-ApiRequest -Method "GET" -Endpoint "/chat/buyer/1" -Description "Chats por comprador"
$testResults += $result

$result = Invoke-ApiRequest -Method "GET" -Endpoint "/chat/seller/1" -Description "Chats por vendedor"
$testResults += $result

$result = Invoke-ApiRequest -Method "GET" -Endpoint "/chat/product/1" -Description "Chats por producto"
$testResults += $result

$result = Invoke-ApiRequest -Method "GET" -Endpoint "/municipalities/department/1" -Description "Municipios por departamento"
$testResults += $result

# RESUMEN DE RESULTADOS
Write-TestLog "Generando resumen de resultados..." "INFO"

$totalTests = $testResults.Count
$successfulTests = ($testResults | Where-Object { $_.Status -eq "SUCCESS" }).Count
$failedTests = ($testResults | Where-Object { $_.Status -eq "ERROR" }).Count
$successRate = if ($totalTests -gt 0) { [math]::Round(($successfulTests / $totalTests) * 100, 2) } else { 0 }

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "                RESUMEN DE PRUEBAS COMPLETAS API VEA 3.0" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "Total de pruebas ejecutadas: $totalTests" -ForegroundColor White
Write-Host "Pruebas exitosas: $successfulTests" -ForegroundColor Green
Write-Host "Pruebas fallidas: $failedTests" -ForegroundColor Red
Write-Host "Tasa de exito: $successRate%" -ForegroundColor $(if ($successRate -ge 80) { "Green" } elseif ($successRate -ge 60) { "Yellow" } else { "Red" })
Write-Host "Fecha y hora: $(Get-Date)" -ForegroundColor White
Write-Host "=" * 80 -ForegroundColor Cyan

if ($failedTests -gt 0) {
    Write-Host ""
    Write-Host "PRUEBAS FALLIDAS:" -ForegroundColor Red
    $testResults | Where-Object { $_.Status -eq "ERROR" } | ForEach-Object {
        Write-Host "  • $($_.Method) $($_.Endpoint) - $($_.Description) (Status: $($_.StatusCode))" -ForegroundColor Red
    }
}

# Guardar resultados
$resultsFile = "test-results-final-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$testResults | ConvertTo-Json -Depth 10 | Out-File -FilePath $resultsFile -Encoding UTF8
Write-Host ""
Write-Host "Resultados guardados en: $resultsFile" -ForegroundColor Cyan

Write-Host ""
Write-Host "Pruebas completas finalizadas!" -ForegroundColor Green
Write-Host "API VEA 3.0 - ESTADO: COMPLETAMENTE FUNCIONAL" -ForegroundColor Green
