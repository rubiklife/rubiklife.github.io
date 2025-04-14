# PowerShell脚本下载图片

# 确保图片目录存在
$imagesDir = "assets\images"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force
}

# 使用Picsum Photos代替Unsplash
$imageUrls = @{
    "$imagesDir\header-bg.jpg" = "https://picsum.photos/1600/900"
    "$imagesDir\post-header.jpg" = "https://picsum.photos/1600/500"
    "$imagesDir\post-teaser.jpg" = "https://picsum.photos/600/400"
    "$imagesDir\feature-1.jpg" = "https://picsum.photos/600/400?random=1"
    "$imagesDir\feature-2.jpg" = "https://picsum.photos/600/400?random=2"
    "$imagesDir\feature-3.jpg" = "https://picsum.photos/600/400?random=3"
    "$imagesDir\project1.jpg" = "https://picsum.photos/800/600?random=4"
    "$imagesDir\project2.jpg" = "https://picsum.photos/800/600?random=5"
    "$imagesDir\project3.jpg" = "https://picsum.photos/800/600?random=6"
}

foreach ($imagePath in $imageUrls.Keys) {
    $url = $imageUrls[$imagePath]
    Write-Host "Downloading image: $url to $imagePath"
    Invoke-WebRequest -Uri $url -OutFile $imagePath
}

Write-Host "All sample images have been downloaded." 