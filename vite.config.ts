import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import fs from "fs";
import path from "path";

/**
 * Plugin Vite para salvar automaticamente em src/assets/db.json
 * todas as lojas, pontos de localização e retas de corredores demarcadas no navegador!
 */
function syncDbPlugin() {
  return {
    name: "vite-plugin-sync-db",
    configureServer(server: { middlewares: { use: (route: string, fn: (req: any, res: any) => void) => void } }) {
      server.middlewares.use("/api/sync-db", (req, res) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const payload = JSON.parse(body);
              const dbPath = path.resolve(process.cwd(), "src/assets/db.json");
              const currentDb = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
              const nextDb = {
                categories: currentDb.categories || [],
                objects: Array.isArray(payload.objects)
                  ? payload.objects
                  : currentDb.objects || [],
                locationPoints: Array.isArray(payload.locationPoints)
                  ? payload.locationPoints
                  : currentDb.locationPoints || [],
                corridorLines: Array.isArray(payload.corridorLines)
                  ? payload.corridorLines
                  : currentDb.corridorLines || [],
              };
              fs.writeFileSync(
                dbPath,
                JSON.stringify(nextDb, null, 2) + "\n",
                "utf-8"
              );
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ ok: false, error: String(e) }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    },
  };
}

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  return {
    appType: "spa",
    server: {
      host: true,
      port: 5173,
      watch: {
        // Ignora alterações em db.json para não recarregar a página durante o auto-save
        ignored: ["**/src/assets/db.json"],
      },
    },
    plugins: [react(), syncDbPlugin(), ViteImageOptimizer({})],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      outDir: "dist",
    },
    esbuild: {
      pure: mode === "production" ? ["console.log"] : [],
    },
  };
});
