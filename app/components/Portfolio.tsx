'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { Code, Award } from 'lucide-react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useTheme } from '@mui/material/styles';
import TabPanel from '@/app/components/TabPanel';
import CardProject from '@/app/components/CardProject';
import ToggleButton from '@/app/components/ToggleButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";

interface Project {
  id: string;
  Title: string;
  Description: string;
  Link: string;
  TechStack?: string[];
}

interface Certificate {
  id: string;
  Img: string;
  Title: string;
}

const Portfolio = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectsSnapshot, certificatesSnapshot] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'certificates')),
      ]);

      const projectsData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        Title: doc.data().Title || "Untitled",
        Description: doc.data().Description || "No description available",
        Link: doc.data().Link || "#",
        TechStack: doc.data().TechStack || [],
      }));

      const certificatesData = certificatesSnapshot.docs.map(doc => ({
        id: doc.id,
        Title: doc.data().Title || "Untitled Certificate",
        Img: doc.data().Img || '/fallback-certificate.png',
      }));

      setProjects(projectsData);
      setCertificates(certificatesData);

      localStorage.setItem('projects', JSON.stringify(projectsData));
      localStorage.setItem('certificates', JSON.stringify(certificatesData));
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
      window.location.href = "https://nikhil-mangla.github.io/Nikhil-mangla-portfolio/";
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleShowMore = (type: 'projects' | 'certificates') => {
    type === 'projects'
      ? setShowAllProjects(prev => !prev)
      : setShowAllCertificates(prev => !prev);
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const initialItems = isMobile ? 4 : 6;
  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

  return (
    <motion.section className="py-16" style={{ backgroundImage }} >
      <div className="min-h-screen bg-[#00000] md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-hidden" id="portfolio" >
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            Portfolio Showcase
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </div>

        <Box sx={{ width: '100%' }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
            >
              <Tab icon={<Code className="mb-2 w-5 h-5 text-white" />} label="Projects" style={{ color: 'white' }} />
              <Tab icon={<Award className="mb-2 w-5 h-5 text-white" />} label="Certificates" style={{ color: 'white' }} />
            </Tabs>
          </AppBar>

          <Box>
            {/* Projects Section */}
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden">
                {loading ? (
                  <div className="text-white">Loading projects...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                      {displayedProjects.map((project, index) => (
                        <div key={project.id || index} data-aos="fade-up" data-aos-duration="1000">
                          <CardProject
                            id={project.id}
                            Title={project.Title}
                            Description={project.Description}
                            LiveLink={project.Link}
                          />
                        </div>
                      ))}
                    </div>
                    {projects.length > initialItems && (
                      <div className="mt-6 w-full flex justify-center">
                        <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabPanel>

            {/* Certificates Section */}
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className="container mx-auto">
                {loading ? (
                  <div className="text-white text-center py-8">Loading certificates...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayedCertificates.map((certificate) => (
                        <div key={certificate.id} data-aos="fade-up" data-aos-duration="1000">
                          <img src={certificate.Img} alt={certificate.Title} className="w-full rounded-lg shadow-lg" />
                        </div>
                      ))}
                    </div>
                    {certificates.length > initialItems && (
                      <div className="mt-6 w-full flex justify-center">
                        <ToggleButton onClick={() => toggleShowMore('certificates')} isShowingMore={showAllCertificates} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabPanel>
          </Box>
        </Box>
      </div>
    </motion.section>
  );
};

export default Portfolio;