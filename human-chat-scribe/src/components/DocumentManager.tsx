
import React from 'react';
import { X, FileText, Trash2, Upload, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: Date;
}

interface DocumentManagerProps {
  documents: Document[];
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDocumentRemove: (id: string) => void;
  onClose: () => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onDocumentUpload,
  onDocumentRemove,
  onClose,
}) => {
  const formatFileSize = (content: string) => {
    const bytes = new Blob([content]).size;
    const sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="mb-6 bg-white/60 backdrop-blur-xl border-white/20 shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Document Library</h2>
              <p className="text-sm text-gray-600">Manage your knowledge base</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Upload Area */}
        <div className="mb-6">
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50">
            <Upload className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">
              Upload text files, markdown files, or PDFs to expand your knowledge base
            </p>
            <input
              type="file"
              multiple
              accept=".txt,.md,.pdf"
              onChange={onDocumentUpload}
              className="hidden"
              id="bulk-upload"
            />
            <label htmlFor="bulk-upload">
              <Button variant="outline" className="bg-white/50 border-purple-200" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </span>
              </Button>
            </label>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Documents List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">
              Uploaded Documents ({documents.length})
            </h3>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {documents.reduce((total, doc) => total + doc.content.length, 0).toLocaleString()} characters
            </Badge>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>No documents uploaded yet</p>
              <p className="text-sm">Upload some documents to get started!</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4 bg-white/40 border-white/20 hover:bg-white/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span>{formatFileSize(doc.content)}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(doc.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDocumentRemove(doc.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
