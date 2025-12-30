"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Loader2, Terminal } from "lucide-react";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/ritiksaxena124/repos?sort=updated&per_page=4`
        );
        const data = await response.json();
        setRepos(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-teal-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <main className="relative mx-auto max-w-5xl px-6 py-24 space-y-32">
        {/* ---------------- HERO ---------------- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 pt-12 text-center md:text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent"
          >
            Ritik Saxena
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-zinc-400 max-w-2xl leading-relaxed"
          >
            Software Engineer @{" "}
            <span className="text-zinc-100">Meetri Infotech</span>. Building
            scalable systems and thoughtful user experiences.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Button
              asChild
              className="bg-white text-black hover:bg-zinc-200 rounded-full"
            >
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm rounded-full"
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.section>

        {/* ---------------- ABOUT (Restored) ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-4 max-w-3xl"
        >
          <h2 className="text-3xl font-bold tracking-tight italic">About</h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            I’m a full-stack developer experienced with Next.js, TypeScript, and
            modern backend systems. I enjoy building products end-to-end — from
            clean UI systems to scalable APIs. I value clean code, system
            design, and performance.
          </p>
        </motion.section>

        {/* ---------------- EXPERIENCE (Restored) ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold italic tracking-tight">
            Experience
          </h2>
          <div className="grid gap-4">
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
              <CardContent className=" space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-zinc-50 font-semibold">
                    Software Engineer — Meetri Infotech
                  </h3>
                  <span className="text-zinc-500 text-sm font-mono">
                    2024 – Present
                  </span>
                </div>
                <ul className="list-disc pl-5 text-zinc-400 space-y-1 text-sm">
                  <li>
                    Building scalable full-stack applications and reusable UI
                    components.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* ---------------- PROJECTS (Live 4 Repos) ---------------- */}
        <section className="space-y-12">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold italic tracking-tight">
              Featured Work
            </h2>
            <Button
              variant="link"
              asChild
              className="text-zinc-400 hover:text-white group"
            >
              <Link href="/projects">
                All Projects{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-zinc-700" />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <motion.div key={repo.id} whileHover={{ y: -5 }}>
                  <Card className="bg-zinc-900/50 border-zinc-800 h-full hover:border-zinc-600 transition-colors">
                    <CardContent className="flex flex-col h-full justify-between">
                      <div className="space-y-4">
                        <Terminal className="h-6 w-6 text-teal-500" />
                        <h3 className="text-xl font-bold text-zinc-100">
                          {repo.name.replace(/-/g, " ")}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-2">
                          {repo.description || "Project details on GitHub."}
                        </p>
                      </div>
                      {repo.language && (
                        <div className="flex items-center justify-between pt-6 mt-auto">
                          <Badge
                            variant="outline"
                            className="text-[10px] text-zinc-50 bg-black border-zinc-800"
                          >
                            {repo.language}
                          </Badge>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            className="text-zinc-500 hover:text-white"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
