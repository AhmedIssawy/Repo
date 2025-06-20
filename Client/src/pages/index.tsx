import Head from 'next/head';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { HeroSection } from '@/components/landing/HeroSection';

// Dynamic imports for components below the fold to improve initial page load
const AboutSection = dynamic(() => import('@/components/landing/AboutSection').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const ProgramsSection = dynamic(() => import('@/components/landing/ProgramsSection').then(mod => ({ default: mod.ProgramsSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const NewsSection = dynamic(() => import('@/components/landing/NewsSection').then(mod => ({ default: mod.NewsSection })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const CTASection = dynamic(() => import('@/components/landing/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />
});

export default function Home() {
  return (
    <>      <Head>
        <title>Enterprise University - Excellence in Higher Education</title>
        <meta name="description" content="Shaping tomorrow's leaders through excellence in education, research, and innovation. Join our community of scholars dedicated to making a positive impact on the world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="university, education, higher education, research, innovation, students, academic excellence" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Enterprise University - Excellence in Higher Education" />
        <meta property="og:description" content="Shaping tomorrow's leaders through excellence in education, research, and innovation." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <PageWrapper>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <NewsSection />
        <CTASection />
      </PageWrapper>
    </>
  );
}
