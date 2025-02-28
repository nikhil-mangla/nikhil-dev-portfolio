// app/projects/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Github, Code2, Star,
  ChevronRight, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";

// Import SweetAlert properly for Next.js
let Swal: typeof import('sweetalert2').default | undefined;
if (typeof window !== "undefined") {
  // Only import Swal on the client side
  import("sweetalert2").then((module) => {
    Swal = module.default;
  });
}

// Add interface for project data
interface Project {
  id: string;
  title: string;
  description: string;
  github: string;
  techStack: string[];
  responsibilities: string[];
  // Add fallback field names for flexibility
  Title?: string;
  Description?: string;
  Github?: string;
  TechStack?: string[];
  TeckStack?: string[];
  TeckState?: string[];
  Teckstack?: string[];
  Responsibilities?: string[];
  "Responsibilities "?: string[];
  [key: string]: string | string[] | undefined; // Add index signature for unknown properties
}

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = TECH_ICONS[tech as keyof typeof TECH_ICONS] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: string }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }: { project: Project }) => {
  const techStackCount = project?.techStack?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technology</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink: string) => {
  if (githubLink === 'Private') {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'info',
        title: 'Source Code Private',
        text: 'Maaf, source code untuk proyek ini bersifat privat.',
        confirmButtonText: 'Mengerti',
        confirmButtonColor: '#3085d6',
        background: '#030014',
        color: '#ffffff'
      });
    }
    return false;
  }
  return true;
};

// Error component for Next.js error handling
const ErrorComponent = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="text-red-400 text-center">
        <h2 className="text-2xl mb-4">Something went wrong</h2>
        <button
          className="border px-4 py-2 rounded-lg hover:bg-white/10"
          onClick={() => router.refresh()}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function for string normalization
  const normalizeString = (str: string) => str.toLowerCase().trim();

  useEffect(() => {
    // Load SweetAlert2 if not already loaded
    if (typeof window !== "undefined" && !Swal) {
      import("sweetalert2").then((module) => {
        Swal = module.default;
      });
    }
  }, []);

  // Fixed useEffect for fetching project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          const storedProjects: Project[] = JSON.parse(localStorage.getItem("projects") || "[]");
          
          console.log("Stored projects:", storedProjects);
          console.log("Looking for ID:", id);
          
          // Check if anything is in localStorage
          if (storedProjects.length === 0) {
            console.error("No projects found in localStorage");
            setError("No projects data available");
            return;
          }
        
          const projectId = Array.isArray(id) ? id[0] : id || '';
          console.log("Normalized project ID to search for:", normalizeString(projectId));
          
          // Log all project IDs for comparison
          console.log("Available project IDs:", storedProjects.map((p: Project) => p.id));
          
          const selectedProject = storedProjects.find((p: Project) => 
            normalizeString(p.id) === normalizeString(projectId)
          );
        
          if (selectedProject) {
            console.log("Raw project data:", selectedProject);
            
            // More detailed logging of each field
            console.log("Title:", selectedProject.title || selectedProject.Title);
            console.log("Description:", selectedProject.description || selectedProject.Description);
            console.log("GitHub:", selectedProject.github || selectedProject.Github);
            
            // Combine multiple possible field names for tech stack and responsibilities
            const techStack = [
              ...(selectedProject.techStack || []),
              ...(selectedProject.TechStack || []),
              ...(selectedProject.TeckStack || []),
              ...(selectedProject.TeckState || []),
              ...(selectedProject.Teckstack || [])
            ].filter(Boolean);
            
            const responsibilities = [
              ...(selectedProject.responsibilities || []),
              ...(selectedProject.Responsibilities || []),
              ...(selectedProject["Responsibilities "] || [])
            ].filter(Boolean);
            
            console.log("Tech Stack:", techStack);
            console.log("Responsibilities:", responsibilities);
            
            // Enhanced field normalization
            const normalizedProject: Project = {
              id: selectedProject.id,
              title: selectedProject.title || selectedProject.Title || "Untitled Project",
              description: selectedProject.description || selectedProject.Description || "",
              github: selectedProject.github || selectedProject.Github || '#',
              techStack: techStack.length > 0 ? techStack : [],
              responsibilities: responsibilities.length > 0 ? responsibilities : []
            };
        
            console.log("Normalized project:", normalizedProject);
        
            setProject(normalizedProject);
          } else {
            console.warn("Project not found!");
            setError("Project not found");
            router.push('/not-found');
          }
        }
      } catch (err: unknown) {
        console.error("Error fetching project:", err);
        let errorMessage = "An unknown error occurred";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Call the fetchProject function (this was missing in original code)
    fetchProject();
  }, [id, router]);

  if (error) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  if (!project || !project.title || !project.description) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-4 text-red-400">
          <h2 className="text-xl">Invalid Project Data</h2>
          <p className="text-sm">Missing required fields</p>
          
          <button
            className="border px-4 py-2 rounded-lg hover:bg-white/10"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => router.push('/#portfolio')}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project?.title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project?.title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project?.description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href={project?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project?.github) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-0" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-12 md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  Technologies Used
                </h3>
                {project.techStack && project.techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.techStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Responsibilities
                </h3>
                {project.responsibilities && project.responsibilities.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.responsibilities.map((responsibility, index) => (
                      <FeatureItem key={index} feature={responsibility} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">No responsibilities listed.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}