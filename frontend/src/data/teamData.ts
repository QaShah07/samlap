export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  area_of_work: string;
  affiliation: string;
  profileUrl?: string;
  category: 'research' | 'collaborator';
}


// export const teamMembers: TeamMember[] = [
//   {
//     id: 1,
//     name: 'Dr. Anika Sharma',
//     role: 'Lead Researcher',
//     photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'research',
//     linkedinUrl: 'https://linkedin.com/in/anika-sharma'
//   },
//   {
//     id: 2,
//     name: 'Dr. Rohan Verma',
//     role: 'Senior Analyst',
//     photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'research',
//     linkedinUrl: 'https://linkedin.com/in/rohan-verma'
//   },
//   {
//     id: 3,
//     name: 'Dr. Priya Kapoor',
//     role: 'Research Associate',
//     photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'research',
//     linkedinUrl: 'https://linkedin.com/in/priya-kapoor'
//   },
//   {
//     id: 4,
//     name: 'Dr. Arjun Singh',
//     role: 'Data Scientist',
//     photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'research',
//     linkedinUrl: 'https://linkedin.com/in/arjun-singh'
//   },
//   {
//     id: 5,
//     name: 'Dr. Vikram Patel',
//     role: 'Professor of Economics',
//     photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'collaborator',
//     affiliation: 'Delhi University',
//     linkedinUrl: 'https://linkedin.com/in/vikram-patel'
//   },
//   {
//     id: 6,
//     name: 'Dr. Meera Desai',
//     role: 'Professor of Finance',
//     photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'collaborator',
//     affiliation: 'Mumbai University',
//     linkedinUrl: 'https://linkedin.com/in/meera-desai'
//   },
//   {
//     id: 7,
//     name: 'Dr. Karthik Iyer',
//     role: 'Senior Economist',
//     photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'collaborator',
//     affiliation: 'National Institute of Finance',
//     linkedinUrl: 'https://linkedin.com/in/karthik-iyer'
//   },
//   {
//     id: 8,
//     name: 'Dr. Neha Reddy',
//     role: 'Research Fellow',
//     photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
//     category: 'collaborator',
//     affiliation: 'Institute for Economic Studies',
//     linkedinUrl: 'https://linkedin.com/in/neha-reddy'
//   }
// ];