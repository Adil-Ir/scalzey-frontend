import type { UserProfile } from "../context/UserProfileContext";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  aboutMe?: string;
  avatarUrl?: string | null;
  roles?: string[];
}

/**
 * Update user profile — ready for API integration.
 * Replace the mock implementation with your backend PATCH /api/profile endpoint.
 */
export async function updateProfileApi(
  payload: UpdateProfilePayload,
  currentProfile?: UserProfile
): Promise<Partial<UserProfile>> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/profile', {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) throw new Error(await response.text());
  // return response.json();

  // Mock: simulate network delay
  await new Promise((r) => setTimeout(r, 300));
  return { ...currentProfile, ...payload };
}
