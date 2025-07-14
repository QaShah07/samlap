import React from 'react';
import { Users, Award, Building2, GraduationCap } from 'lucide-react';
import SanjayMalhotraImg from '../../assets/images/Sanjay_Malhotra.png';
import Poonumgupta from '../../assets/images/Poonum_gupta.jpg';
import RajivRanjan from '../../assets/images/Rajiv Ranjan.jpg';
import Ramsingh from '../../assets/images/RamSingh.jpg';
import Saugata from '../../assets/images/Saugata.png';
import Nagesj from '../../assets/images/Nagesh.jpg';

const MPCMembers: React.FC = () => {
  const members = [
    {
      name: "Sanjay Malhotra",
      title: "Internal Member, Reserve Bank of India",
      image: SanjayMalhotraImg,
      description: "Sanjay Malhotra was appointed as the 26th Governor of the Reserve Bank of India on 9 December 2024, following nomination by the government. He officially assumed office on 11 December 2024, commencing a three-year term. Prior to this, he served as Revenue Secretary (Dec 2022–Dec 2024) and Financial Services Secretary, bringing extensive administrative experience. Malhotra holds a B.Tech in Computer Science from IIT Kanpur and a Master’s in Public Policy from Princeton. As RBI Governor, he advocates a data-driven, growth-oriented monetary policy, balancing inflation control with economic expansion.",
      icon: Building2,
      expertise: ["Finance and Taxation"],
      years: "33 years of experience",
      tenure: "Tenure: 11th December 2024 to Present"
    },
    {
      name: "Poonam Gupta",
      title: "Internal Member, Reserve Bank of India",
      image: Poonumgupta,
      description: "Dr. Poonam Gupta is an eminent Indian economist and a leading voice in public policy and central banking. She holds a Ph.D. in International Economics from the University of Maryland and has previously served at the IMF and the World Bank. From 2021 to 2025, she was the Director-General of NCAER, where she led influential research on macroeconomic and industrial policy. In April 2025, she was appointed Deputy Governor of the Reserve Bank of India, where she currently oversees monetary policy and economic research. Dr. Gupta brings a global perspective to India’s central banking framework.",
      icon: Award,
      expertise: ["Macroeconomics and markets"],
      years: "31+ years overall experience",
      tenure: "Tenure: 2nd April 2025 to Present (Three year term)"
    },
    {
      name: "Dr. Rajiv Ranjan ",
      title: "Internal Member, Reserve Bank of India",
      image: RajivRanjan,
      description: "Dr. Rajiv Ranjan is a senior economist and Executive Director at the Reserve Bank of India, currently serving as a member of the Monetary Policy Committee (MPC). He has played a pivotal role in shaping India’s monetary policy framework, particularly in the areas of inflation targeting and macroeconomic modeling. Prior to becoming Executive Director, he served as Principal Adviser and Head of the Monetary Policy Department at the RBI. Dr. Ranjan is known for his deep expertise in monetary economics, inflation dynamics, and policy analysis. As an MPC member, he contributes to critical decisions affecting interest rates and the broader Indian economy.",
      icon: GraduationCap,
      expertise: ["Economic Policy & Research", "Monetary Policy Department"],
      years: "35+ years overall experience",
      tenure: "Tenure: May 2022 to Present"
    },
    {
      name: "Prof. Ram Singh ",
      title: "External Member, Reserve Bank of India",
      image: Ramsingh,
      description: "Prof. Ram Singh is a distinguished economist and the Director of the Delhi School of Economics, with a Ph.D. from JNU and a postdoctoral fellowship at Harvard University. He specializes in contract theory, law and economics, public economics, and infrastructure policy. Singh has held numerous visiting positions at prestigious institutions such as Brown University, Hamburg University, and Bucerius Law School. His research has been widely published and cited—covering topics like land acquisition, public–private partnerships, and liability rules. Appointed as an external member of India’s Monetary Policy Committee in October 2024, he brings deep academic insight to monetary policy deliberations.",
      icon: Users,
      expertise: ["Public Economics", "Taxes and Public Finance", "Law and Economics","Banking and Financial Regulations", "Indian Economy"],
      years: "25+ years overall experiences",
      tenure: "Tenure: October 2024 to Present (Four year term)"
    },
    {
      name: "Dr. Saugata Bhattacharya",
      title: "External Member, Reserve Bank of India",
      image: Saugata,
      description: "Dr. Saugata Bhattacharya is a seasoned economist with over three decades of expertise, currently serving as an external member of the RBI’s Monetary Policy Committee and Senior Fellow at the Centre for Policy Research. Prior to joining CPR, he led the economic research team as Chief Economist and Executive Vice President at Axis Bank, after experience at Unilever and IDFC. His research spans infrastructure finance, consumer behaviour, MSME economics, and macro-financial forecasting. Bhattacharya has also contributed to key government advisory bodies, including the PM’s Task Force on Infrastructure and RBI/Ministry committees. Known for his pragmatic insights on inflation, policy rates, and growth dynamics, he often advocates an accommodative stance when warranted by macroeconomic trends.",
      icon: Users,
      expertise: ["Public Economics", "Taxes and Public Finance", "Law and Economics","Banking and Financial Regulations", "Indian Economy"],
      years: "30+ years overall experience",
      tenure: "Tenure: October 2024 to Present (Four year term)"
    },
    {
      name: "Dr. Nagesh Kumar ",
      title: "External Member, Reserve Bank of India",
      image: Nagesj,
      description: "Dr. Nagesh Kumar is a distinguished economist and currently serves as Director and Chief Executive of the Institute for Studies in Industrial Development (ISID) in New Delhi, a role he took on in May 2021. He was appointed in October 2024 as an external member of the Reserve Bank of India’s Monetary Policy Committee. Prior to ISID, he spent over a decade at the United Nations Economic and Social Commission for Asia and the Pacific (UNESCAP) in Bangkok, holding senior leadership positions including Chief Economist and Director of key policy divisions. From 2002 to 2009, he was Director-General of the Research and Information System for Developing Countries (RIS), and earlier served as an economist at the United Nations University in Maastricht from 1993 to 1998. With a Ph.D. from the Delhi School of Economics, Dr. Kumar has authored 18 books and over 120 peer-reviewed papers, and has held advisory roles with global institutions like the World Bank, ADB, and UN agencies.",
      icon: Users,
      expertise: ["Industrial and Innovation Policy", "International Trade and Regional Economic Integration"],
      years: "30+ years overall experience",
      tenure: "Tenure: October 2024 to Present (Four year term)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              Monetary Policy Committee
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the distinguished members who shape India's monetary policy decisions, 
              bringing decades of expertise in economics, finance, and public policy.
            </p>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {members.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div key={index} className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{member.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{member.tenure}</p>
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        <Award className="w-4 h-4 mr-1" />
                        {member.years} experience
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                    {member.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Key Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Committee Overview */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Committee Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Monetary Policy Committee consists of six highly accomplished individuals, bringing a collective expertise of over 180 years across economics, public policy, finance, and international development. Each member holds advanced degrees and plays a crucial role in shaping India’s economic future.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <div className="text-sm text-gray-600">Committee Members</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">184+</div>
              <div className="text-sm text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">PhD/Masters Qualified</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5+</div>
              <div className="text-sm text-gray-600">Key Policy Domains</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MPCMembers;
