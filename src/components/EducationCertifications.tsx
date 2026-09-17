import React from 'react';
import { ThemeColors } from '../types';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DSAMatrix } from './DSAMatrix';

interface EducationCertificationsProps {
  theme: ThemeColors;
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({ theme }) => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>VERIFIED CREDENTIALS &amp; ACADEMICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
          Education, Certifications &amp; Algorithmic Mastery
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light">
          Formal academic degree from Graphic Era combined with intensive applied machine learning certifications and 500+ verified competitive programming problem solving.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all backdrop-blur-md relative overflow-hidden group">
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 transition-all group-hover:opacity-40"
            style={{ background: theme.primary }}
          />

          <div className="flex items-start justify-between gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-mono text-xs font-semibold">
              ENROLLED · IN PROGRESS
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              UNDERGRADUATE DEGREE
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
              {PERSONAL_INFO.degree}
            </h3>
            <div className="text-base font-medium text-gray-200">
              {PERSONAL_INFO.university}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.expectedGraduation}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
            </div>

            <div className="pt-3 text-xs text-gray-300 leading-relaxed font-light">
              Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming (Java), Database Management Systems (SQL), Operating Systems, Software Engineering, and Applied Mathematics.
            </div>
          </div>
        </div>

        {/* Certification Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-violet-500/40 transition-all backdrop-blur-md relative overflow-hidden group">
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 transition-all group-hover:opacity-40"
            style={{ background: theme.secondary }}
          />

          <div className="flex items-start justify-between gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center text-violet-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-300 font-mono text-xs font-semibold">
              VERIFIED CREDENTIAL
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-mono text-violet-300 tracking-wider uppercase">
              PROFESSIONAL CERTIFICATION
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
              Prime (AI / Machine Learning)
            </h3>
            <div className="text-base font-medium text-gray-200">
              Apna College
            </div>

            <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-gray-300 break-all select-all">
              <span className="text-gray-400">Credential ID: </span>
              <span className="text-violet-300 font-semibold">6a689235ff15cede5e0b6900</span>
            </div>

            <div className="pt-2 text-xs text-gray-300 leading-relaxed font-light">
              Comprehensive industry training encompassing Machine Learning algorithms, Deep Neural Networks (CNNs, RNNs), PyTorch framework, Computer Vision, and Natural Language Processing model architectures.
            </div>
          </div>
        </div>
      </div>

      {/* Verified Problem Solving Interactive Matrix */}
      <DSAMatrix theme={theme} />
    </div>
  );
};
