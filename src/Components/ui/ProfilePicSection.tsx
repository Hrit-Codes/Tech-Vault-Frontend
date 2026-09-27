
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateAvatar } from "../../apis/modules/auth";

interface Props {
  avatar: string;
}

const ProfilePicSection = ({ avatar }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatar || "/avatar-placeholder.webp");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const ProfilePicMutation = useMutation({
    mutationFn: (file: File) => updateAvatar(file),
  });

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSaveProfilePic = () => {
    if (!selectedFile) return;
    ProfilePicMutation.mutate(selectedFile, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["currentUser"] });
        toast.success("Profile picture updated successfully!");
        setSelectedFile(null);
      },
      onError: (error:any) => {
        const message=error.response?.data?.message || "Invalid email or password";
        toast.error(message);
        console.error(message);
      },
    });
  };

  const handleCameraClick=()=>{
    fileInputRef.current?.click();
  }

  useEffect(() => {
    if (avatar) {
      setPreviewUrl(avatar);
    }
  }, [avatar]);

  return (
    <div className=" flex flex-col">
      <label className="block text-sm font-medium text-center mb-3">Profile Photo</label>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-primary-400 p-0.5 overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleCameraClick}
            className="absolute bottom-0 right-0 w-6 h-6 bg-primary-400 text-black rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors hover:cursor-pointer"
          >
            <Camera className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-2">
          {!selectedFile ? (
            <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
            </>
          ) : (
              <>
                  <button
                    type="button"
                    disabled={ProfilePicMutation.isPending}
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(avatar || null);
                    }}
                    className="flex items-center px-3 py-2 border border-red-700 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors text-sm hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={ProfilePicMutation.isPending}
                    onClick={handleSaveProfilePic}
                    className="flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors text-sm font-medium hover:cursor-pointer"
                  >
                    {ProfilePicMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicSection;
