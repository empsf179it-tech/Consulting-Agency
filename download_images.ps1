$images = @{
    "hero-bg.webp" = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80"
    "about-visual.webp" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    "ind-finance.webp" = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    "ind-health.webp" = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
    "ind-tech.webp" = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    "ind-retail.webp" = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
    "ind-mfg.webp" = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
    "ind-energy.webp" = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"
    "cs-1.webp" = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
    "cs-2.webp" = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    "cs-3.webp" = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
    "insight-1.webp" = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
    "insight-2.webp" = "https://images.unsplash.com/photo-1573164713619-24cb111a592c?w=800&q=80"
    "insight-3.webp" = "https://images.unsplash.com/photo-1586528116311-ad8ed7c15433?w=800&q=80"
}

foreach ($img in $images.GetEnumerator()) {
    Invoke-WebRequest -Uri $img.Value -OutFile "assets/images/$($img.Key)"
}
