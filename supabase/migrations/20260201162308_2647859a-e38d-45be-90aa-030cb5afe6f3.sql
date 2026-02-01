-- Create storage bucket for expense receipts
INSERT INTO storage.buckets (id, name, public) 
VALUES ('expense-receipts', 'expense-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for users to upload their own receipts
CREATE POLICY "Users can upload expense receipts"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'expense-receipts' 
  AND auth.uid() IS NOT NULL
);

-- Create policy for users to view receipts from accessible trips
CREATE POLICY "Users can view expense receipts"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'expense-receipts'
  AND auth.uid() IS NOT NULL
);

-- Create policy for users to delete their own receipts
CREATE POLICY "Users can delete expense receipts"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'expense-receipts'
  AND auth.uid() IS NOT NULL
);