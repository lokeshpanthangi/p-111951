
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ImageDropzoneProps {
  onImageSelect: (file: File | null) => void;
  existingImageUrl?: string;
}

const ImageDropzone = ({ onImageSelect, existingImageUrl }: ImageDropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    onImageSelect(file);
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Clean up the preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [onImageSelect, toast]);

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-md overflow-hidden border">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
            onClick={removeImage}
            type="button"
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`drop-area cursor-pointer transition-colors ${
            isDragActive ? "drop-area-active" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-center">
            {isDragActive ? (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Drop your image here...</p>
              </>
            ) : (
              <>
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="font-medium">Drag & drop an image here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse (optional)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
