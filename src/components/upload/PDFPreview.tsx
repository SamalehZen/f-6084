
import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PDFPreviewProps {
  fileName: string;
  fileSize: number;
  pagesCount?: number;
  contentSummary?: string;
  onPreview?: () => void;
}

const PDFPreview = ({ fileName, fileSize, pagesCount, contentSummary, onPreview }: PDFPreviewProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-red-500" />
          <span>Aperçu du document</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Nom :</span>
            <p className="text-gray-900 truncate">{fileName}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Taille :</span>
            <p className="text-gray-900">{formatFileSize(fileSize)}</p>
          </div>
          {pagesCount && (
            <div>
              <span className="font-medium text-gray-700">Pages :</span>
              <p className="text-gray-900">{pagesCount}</p>
            </div>
          )}
        </div>
        
        {contentSummary && (
          <div>
            <span className="font-medium text-gray-700">Résumé automatique :</span>
            <p className="text-gray-600 text-sm mt-1 p-3 bg-gray-50 rounded-md">
              {contentSummary}
            </p>
          </div>
        )}
        
        {onPreview && (
          <Button onClick={onPreview} variant="outline" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            Prévisualiser le document
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFPreview;
