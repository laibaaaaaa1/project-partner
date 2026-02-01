import { useRef, useState } from 'react';
import { Camera, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useReceiptUpload } from '@/hooks/useReceiptUpload';

interface ReceiptUploadProps {
  tripId: string;
  expenseId?: string;
  currentReceiptUrl?: string;
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
}

export function ReceiptUpload({
  tripId,
  expenseId,
  currentReceiptUrl,
  onUploadComplete,
  onRemove,
}: ReceiptUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadReceipt, isUploading, progress } = useReceiptUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentReceiptUrl || null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const result = await uploadReceipt(file, tripId, expenseId);
    if (result) {
      onUploadComplete(result.url);
      setPreviewUrl(result.url);
    } else {
      setPreviewUrl(currentReceiptUrl || null);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onRemove?.();
  };

  const isPdf = previewUrl?.toLowerCase().includes('.pdf');

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {isUploading ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading receipt...</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      ) : previewUrl ? (
        <div className="relative">
          {isPdf ? (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <FileText className="h-8 w-8 text-coral" />
              <span className="text-sm">Receipt PDF attached</span>
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="Receipt"
              className="w-full h-32 object-cover rounded-lg border"
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
          Add Receipt Photo
        </Button>
      )}
    </div>
  );
}
