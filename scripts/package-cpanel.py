"""Package only the checked static export and cPanel config, never source/secrets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
output = root / "out"
assert 'rel="canonical" href="https://creativecdi.org/"' in (output / "index.html").read_text(), "Build for https://creativecdi.org before packaging."
destination = root / "dist" / "creativecdi-cpanel.zip"
destination.parent.mkdir(exist_ok=True)
with ZipFile(destination, "w", compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted(output.rglob("*")):
        if file.is_file() and file.name != ".DS_Store":
            archive.write(file, file.relative_to(output).as_posix())
    archive.write(root / "deployment" / "cpanel.htaccess", ".htaccess")
with ZipFile(destination) as archive:
    assert archive.testzip() is None, "Corrupt archive"
    assert {"index.html", ".htaccess", "robots.txt", "sitemap.xml", "social/home.png", "404.html"}.issubset(archive.namelist())
    assert not any(name.startswith(("src/", "node_modules/", ".env", ".git/")) for name in archive.namelist())
print(f"Verified cPanel archive: {destination} ({destination.stat().st_size / 1024 / 1024:.1f} MB)")
