import GLib from "gi://GLib"

const main = "/tmp/ags/hyprpanel/main.js"
const entry = `${App.configDir}/main.ts`
const bundler = GLib.getenv("AGS_BUNDLER") || "bun"

const v = {
    ags: pkg.version?.split(".").map(Number) || [],
    expect: [1, 8, 1],
}

try {
    switch (bundler) {
        case "bun": await Utils.execAsync([
            "bun", "build", entry,
            "--outfile", main,
            "--external", "resource://*",
            "--external", "gi://*",
            "--external", "file://*",
        ]); break

        case "esbuild": await Utils.execAsync([
            "esbuild", "--bundle", entry,
            "--format=esm",
            `--outfile=${main}`,
            "--external:resource://*",
            "--external:gi://*",
            "--external:file://*",
        ]); break

        default:
            throw `"${bundler}" is not a valid bundler`
    }

    await import(`file://${main}`)
} catch (error) {
    console.error(error)
    App.quit()
}

export { }
