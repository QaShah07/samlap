import React from 'react';
import { Users, Target, Calendar, Award, Shield, BookOpen, Gavel, FileText, CheckCircle, AlertCircle, TrendingUp, Clock } from 'lucide-react';

export default function MPCFormation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Monetary Policy
              <span className="block bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Committee Formation
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Understanding the establishment and evolution of India's Monetary Policy Committee
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Formation of the Monetary Policy Committee
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-5xl mx-auto">
              The Monetary Policy Committee (MPC) is a statutory body constituted by the Reserve Bank of India (RBI) 
              under Section 45ZB of the Reserve Bank of India Act, 1934. It represents a paradigm shift towards 
              transparent, accountable, and collective decision-making in India's monetary policy framework.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  Primary Mandate
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">
                  Maintaining price stability while keeping in mind the objective of growth. The committee operates 
                  under a flexible inflation targeting framework with a target of 4% Consumer Price Index (CPI) 
                  inflation with a tolerance band of ±2%.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  Key Functions
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">
                  Setting the policy repo rate, reviewing macroeconomic conditions, and ensuring monetary policy 
                  decisions support sustainable economic growth while maintaining financial stability and market confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Committee Composition */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Committee Composition
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">RBI Representatives</h3>
                </div>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    RBI Governor (Chairperson)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Deputy Governor (in charge of Monetary Policy)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    One Officer of RBI (nominated by Central Board)
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Government Nominees</h3>
                </div>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Three external members appointed by Government of India
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Four-year tenure with expertise in economics/banking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Cannot be reappointed for second term
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Making Process */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Decision Making Framework
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Consensus Building</h3>
              <p className="text-gray-600 leading-relaxed">
                Decisions are made through voting, with each member having one vote. The Governor has a casting vote in case of a tie.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Minutes of meetings are published within 14 days, including individual member votes and rationale.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accountability</h3>
              <p className="text-gray-600 leading-relaxed">
                If inflation remains outside the target band for three consecutive quarters, the Governor must explain to the Government.
              </p>
            </div>
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Formation & Evolution
          </h2>
          
          <div className="relative">
            <div className="absolute left-8 top-16 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            
            <div className="space-y-16">
              {/* Pre-2016 */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg relative z-10">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center mb-4">
                      <span className="text-sm font-medium text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full">
                        Pre-2016
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Governor-Centric Approach</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Monetary policy decisions were primarily made by the RBI Governor in consultation with a 
                      Technical Advisory Committee. While effective, this approach lacked the structured 
                      transparency and collective decision-making of a formal committee system.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2014-2015 Reforms */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg relative z-10">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-orange-900/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30">
                    <div className="flex items-center mb-4">
                      <span className="text-sm font-medium text-orange-200 bg-orange-800/50 px-3 py-1 rounded-full">
                        2014-2015
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Urjit Patel Committee Recommendations</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The Expert Committee to Revise and Strengthen the Monetary Policy Framework, chaired by 
                      Dr. Urjit Patel, recommended the adoption of flexible inflation targeting and the 
                      establishment of a Monetary Policy Committee for transparent decision-making.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2016 Formation */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg relative z-10">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/30">
                    <div className="flex items-center mb-4">
                      <span className="text-sm font-medium text-blue-200 bg-blue-800/50 px-3 py-1 rounded-full">
                        May 2016
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">MPC Establishment</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The Finance Act 2016 amended the RBI Act, 1934, to establish the MPC under Section 45ZB. 
                      This marked India's transition to a modern, committee-based monetary policy framework 
                      aligned with international best practices and enhanced institutional credibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* Present */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg relative z-10">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="ml-8 flex-1">
                  <div className="bg-green-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
                    <div className="flex items-center mb-4">
                      <span className="text-sm font-medium text-green-200 bg-green-800/50 px-3 py-1 rounded-full">
                        Present Day
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Mature Policy Framework</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The MPC has successfully established itself as a credible institution, meeting bi-monthly 
                      to set the policy repo rate. Its transparent communication and data-driven approach have 
                      enhanced the effectiveness of monetary policy transmission and anchored inflation expectations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Features & Innovations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Flexible Inflation Targeting</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                4% CPI inflation target with ±2% tolerance band, allowing for short-term deviations while maintaining medium-term price stability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Enhanced Transparency</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Publication of meeting minutes, individual voting records, and detailed rationale for policy decisions within 14 days.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Balanced Composition</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Equal representation from RBI and external experts ensures diverse perspectives and reduces institutional bias.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Accountability Mechanism</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Formal explanation required if inflation stays outside target band for three consecutive quarters.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Regular Schedule</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bi-monthly meetings with pre-announced calendar, providing predictability and reducing market uncertainty.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Gavel className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Democratic Decision Making</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                One person, one vote principle with Governor's casting vote, ensuring collective responsibility for decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Impact & Achievements */}
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-3xl p-12 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Impact & Achievements
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Institutional Credibility</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Enhanced transparency through regular communication and published minutes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Improved predictability of monetary policy decisions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Better anchoring of inflation expectations</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Policy Effectiveness</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">More effective monetary policy transmission</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Balanced approach to growth and inflation objectives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">Enhanced market confidence and reduced volatility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Strengthening India's Monetary Policy Framework
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The MPC represents a significant milestone in India's economic governance, bringing together expertise, 
              transparency, and accountability to ensure price stability and sustainable economic growth for the nation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}