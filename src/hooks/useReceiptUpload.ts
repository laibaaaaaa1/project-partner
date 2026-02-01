import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UploadResult {
  url: string;
  path: string;
}

export function useReceiptUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadReceipt = async (
    file: File,
    tripId: string,
    expenseId?: string
  ): Promise<UploadResult | null> => {
    setIsUploading(true);
    setProgress(0);

    try {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload an image (JPEG, PNG, WebP) or PDF file');
        return null;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB');
        return null;
      }

      setProgress(20);

      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const fileName = `${tripId}/${expenseId || 'temp'}_${timestamp}_${randomId}.${fileExt}`;

      setProgress(40);

      // Upload to storage
      const { data, error } = await supabase.storage
        .from('expense-receipts')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload receipt: ' + error.message);
        return null;
      }

      setProgress(80);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('expense-receipts')
        .getPublicUrl(data.path);

      setProgress(100);
      toast.success('Receipt uploaded successfully!');

      return {
        url: urlData.publicUrl,
        path: data.path,
      };
    } catch (err) {
      console.error('Receipt upload error:', err);
      toast.error('Failed to upload receipt');
      return null;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const deleteReceipt = async (path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('expense-receipts')
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete receipt');
        return false;
      }

      toast.success('Receipt deleted');
      return true;
    } catch (err) {
      console.error('Receipt delete error:', err);
      toast.error('Failed to delete receipt');
      return false;
    }
  };

  return {
    uploadReceipt,
    deleteReceipt,
    isUploading,
    progress,
  };
}
