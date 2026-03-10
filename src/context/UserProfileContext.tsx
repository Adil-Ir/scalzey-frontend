import { createContext, useContext, useState, useCallback } from "react";

/** Enrolled community — API-ready: slug used for links to /community/:slug */
export interface EnrolledCommunity {
  id?: string;
  name: string;
  slug: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string | null;
  phone?: string;
  location?: string;
  website?: string;
  aboutMe?: string;
  roles?: string[];
  courses?: { id?: string; name: string; score?: number }[];
  /** Enrolled communities — use slug for redirect; API returns { id, name, slug }[] */
  enrolledCommunities?: (string | EnrolledCommunity)[];
  interests?: string[];
  isPublicProfile?: boolean;
}

interface UserProfileContextValue {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  name: "Setalia Green",
  email: "mstellag@gmail.com",
  avatarUrl: null,
  phone: "+923407712693",
  location: "New York, United States",
  website: "https://www.google.com",
  aboutMe: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  roles: ["Cloud Computing", "UX Prototyping", "Data Analysis", "Machine Learning", "API Integration", "Network Security", "UI Engineering"],
  courses: [{ name: "Java", score: 254 }, { name: "Ux Design", score: 254 }, { name: "Project Managment", score: 254 }],
  enrolledCommunities: [
    { id: "1", name: "Geeki Learn", slug: "geeki-learn" },
    { id: "2", name: "Product Visuals", slug: "product-visuals" },
    { id: "3", name: "Dev Crown", slug: "dev-crown" },
  ],
  interests: ["Management", "Technology"],
  isPublicProfile: false,
};

const UserProfileContext = createContext<UserProfileContextValue>({
  profile: defaultProfile,
  updateProfile: () => {},
});

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
    // TODO: Integrate API - e.g. await api.updateProfile(data)
    // const response = await fetch('/api/profile', { method: 'PATCH', body: JSON.stringify(data) });
    // if (response.ok) { ... }
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
