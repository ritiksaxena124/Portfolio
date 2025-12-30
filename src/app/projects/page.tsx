"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Github,
  Star,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// 1. Define the interface for the GitHub Repository object
interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  homepage: string | null;
}

export default function ProjectsPage() {
  // 2. Type the state as an array of Repository
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/ritiksaxena124/repos?sort=pushed`)
      .then((res) => res.json())
      .then((data) => {
        // Handle API error or empty results
        setRepos(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 p-8 md:p-24 selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation */}
        <Button
          variant="ghost"
          asChild
          className="text-zinc-400 hover:text-white hover:bg-zinc-900 -ml-4 transition-all"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A curated collection of my digital experiments, open-source
            contributions, and technical deep-dives.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))
            : repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  );
}

// 3. Properly type the props for ProjectCard
function ProjectCard({ repo }: { repo: Repository }) {
  return (
    <Card className="group relative overflow-hidden bg-zinc-900/20 border-zinc-800/50 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-15px_rgba(20,184,166,0.3)]">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardContent className="relative p-6 space-y-5">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-zinc-800/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Terminal className="h-5 w-5 text-teal-500" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/80 rounded-full border border-zinc-800">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-medium text-zinc-400">
              {repo.stargazers_count}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-teal-400 transition-colors truncate">
            {repo.name}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed h-10">
            {repo.description || "No description provided for this repository."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {repo.language && (
            <Badge
              variant="secondary"
              className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 border-none text-[10px]"
            >
              <Code2 className="mr-1 h-3 w-3" />
              {repo.language}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
            GitHub Repo
          </span>
          <div className="flex gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
            >
              <Github className="h-5 w-5" />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-400 hover:text-teal-400 hover:bg-zinc-800 rounded-full transition-all"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectSkeleton() {
  return (
    <Card className="bg-zinc-900/20 border-zinc-800">
      <CardContent className="p-6 space-y-5">
        <div className="flex justify-between">
          <Skeleton className="h-9 w-9 rounded-lg bg-zinc-800/50" />
          <Skeleton className="h-6 w-12 rounded-full bg-zinc-800/50" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-2/3 bg-zinc-800/50" />
          <Skeleton className="h-4 w-full bg-zinc-800/50" />
        </div>
        <Skeleton className="h-5 w-20 rounded bg-zinc-800/50" />
        <div className="pt-4 border-t border-zinc-800/50 flex justify-between">
          <Skeleton className="h-3 w-20 bg-zinc-800/50" />
          <Skeleton className="h-8 w-8 rounded-full bg-zinc-800/50" />
        </div>
      </CardContent>
    </Card>
  );
}
