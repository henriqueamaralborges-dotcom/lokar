$urls = @(
    "https://www.lokaraudiovisual.com.br/Shop/p/000375/camera-sony--zv-e1-fullframe-4k-120p--corpo",
    "https://www.lokaraudiovisual.com.br/Shop/p/000374/insta360-ace-pro-2-kit-impressao",
    "https://www.lokaraudiovisual.com.br/Shop/p/000373/fujifilm-instax-mini-evo-retro--impressao-na-hora",
    "https://www.lokaraudiovisual.com.br/Shop/p/000360/camera--dji-osmo-action--6-kit-lokar",
    "https://www.lokaraudiovisual.com.br/Shop/p/000322/canon-powershot--g7x-mark-iii-preta",
    "https://www.lokaraudiovisual.com.br/Shop/p/000329/canon-mirrorless-r50v-e-lente-rf-s-14-30mm-is-stm-pz",
    "https://www.lokaraudiovisual.com.br/Shop/p/000347/nikon--zr-6k-cinema--camera-kit",
    "https://www.lokaraudiovisual.com.br/Shop/p/000316/camera-canon-mirrorless-r100-com-lente-rf-s-18-45mm",
    "https://www.lokaraudiovisual.com.br/Shop/p/000288/camera-dji-osmo-pocket-3-combo-creator",
    "https://www.lokaraudiovisual.com.br/Shop/p/000277/camera--blackmagic-cinema-6k-full--frame-leica-l--adaptador-ef",
    "https://www.lokaraudiovisual.com.br/Shop/p/000265/camera-dji-osmo-pocket-3",
    "https://www.lokaraudiovisual.com.br/Shop/p/000257/camera-mirrorless-sony-a7iv-4k",
    "https://www.lokaraudiovisual.com.br/Shop/p/000251/camera-canon-r8-mirrorless",
    "https://www.lokaraudiovisual.com.br/Shop/p/000236/camera-fujifilm-instax-mini-12--filme-com-10-poses",
    "https://www.lokaraudiovisual.com.br/Shop/p/000230/canon-sl3-kit-com-lente-18-55mm-stm",
    "https://www.lokaraudiovisual.com.br/Shop/p/000162/gopro-max-360-camera-de-acao-vr-5k",
    "https://www.lokaraudiovisual.com.br/Shop/p/000161/insta360-x3-camera-360-72mp-5.7k",
    "https://www.lokaraudiovisual.com.br/Shop/p/000028/camera-de-video-profissional-canon--xa40",
    "https://www.lokaraudiovisual.com.br/Shop/p/000026/camera-canon-eos-r6-mark-ii-mirrorless",
    "https://www.lokaraudiovisual.com.br/Shop/p/000025/camera-blackmagic-pocket-cinema-6k-pro-canon-ef",
    "https://www.lokaraudiovisual.com.br/Shop/p/000022/camera-sony-zv-e10-com-lente-16-50mm-oss-ns7712269",
    "https://www.lokaraudiovisual.com.br/Shop/p/000021/camera-sony-fx30-super-35-cinema",
    "https://www.lokaraudiovisual.com.br/Shop/p/000019/camera-sony-alpha-a7iii-mirrorless-4k"
)

$dbPath = "C:\Users\fcaza\Documents\GitHub\lokar\lokar_db.json"
$json = Get-Content $dbPath -Raw | ConvertFrom-Json

$newEquipments = @()

foreach ($url in $urls) {
    try {
        $html = Invoke-RestMethod -Uri $url -Method Get
        
        $title = "Equipamento Desconhecido"
        if ($html -match '<meta property="og:title" content="([^"]+)"') {
            $title = $matches[1]
        }
        
        $image = ""
        if ($html -match '<meta property="og:image" content="([^"]+)"') {
            $image = $matches[1]
        }
        
        $price = 150
        if ($html -match "value:\s*(\d+(\.\d+)?)") {
            $price = [double]$matches[1]
        }
        
        $idPart = $url -split '/' | Select-Object -Last 2 | Select-Object -First 1
        $id = "CAM-" + $idPart

        # Check if ID already exists
        $exists = $false
        foreach ($eq in $json.equipamentos) {
            if ($eq.ID -eq $id) { $exists = $true; break }
        }

        if (-not $exists) {
            $newObj = @{
                "ID" = $id
                "Categoria" = "Câmeras"
                "Equipamento" = $title
                "Preço Diária (R$)" = $price
                "Estoque" = 2
                "Status" = "Ativo"
                "URL Imagem" = $image
            }
            $json.equipamentos += $newObj
            Write-Host "Adicionado: $title (R$ $price)"
        } else {
            Write-Host "Já existe: $title"
        }
    } catch {
        Write-Host "Erro ao acessar $url"
    }
}

$json | ConvertTo-Json -Depth 10 | Set-Content $dbPath -Encoding UTF8
Write-Host "lokar_db.json atualizado com sucesso!"
