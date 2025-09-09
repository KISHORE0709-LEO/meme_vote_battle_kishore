import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, Image, Zap, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createMeme } from "@/services/memeService";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [suggestedCaptions, setSuggestedCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const memeCaptions = [
    "When you realize it's Monday again",
    "Me trying to explain my code to someone else",
    "That feeling when your code works on the first try",
    "When the client changes requirements last minute",
    "Me after debugging for 3 hours",
    "When you find the bug that's been haunting you",
    "Trying to look busy when the boss walks by",
    "When someone asks if you tested your code",
    "Me pretending to understand the legacy code",
    "When the production server goes down",
    "That moment when you realize you forgot to save",
    "When you accidentally delete the wrong file",
    "Me explaining why I need another monitor",
    "When the coffee machine is broken",
    "Trying to fix a bug at 3 AM",
    "When you finally solve that impossible problem",
    "Me when someone says 'it works on my machine'",
    "When you see your code from 6 months ago",
    "That face when you realize you've been debugging the wrong function",
    "When you push to production on Friday"
  ];

  const generateCaptions = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const shuffled = [...memeCaptions].sort(() => Math.random() - 0.5);
      setSuggestedCaptions(shuffled.slice(0, 3));
      setIsGenerating(false);
    }, 1000);
  };

  const processFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // File type validation
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported File Type",
          description: `File type "${file.type}" is not supported. Please use: JPG, PNG, GIF, WebP, MP4, WebM.`,
          variant: "destructive",
        });
        return;
      }



      setImageFile(file);
      
      try {
        const result = await processFile(file);
        setImagePreview(result);
      } catch (error) {
        toast({
          title: "File Processing Error",
          description: "Failed to process the file. Please try a smaller file.",
          variant: "destructive",
        });
      }
    }
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title to your meme",
        variant: "destructive",
      });
      return;
    }

    if (!imageFile) {
      toast({
        title: "Media File Required", 
        description: "Please select an image or video file for your meme",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const finalImageUrl = imagePreview;
      
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      createMeme({
        title: title.trim(),
        imageUrl: finalImageUrl,
        author: user.username,
        authorId: user.id,
        tags: tagArray
      });
      
      toast({
        title: "Meme Uploaded! 🎉",
        description: "Your meme has entered the arena and is ready for battle!",
      });
      
      // Reset form and redirect
      setTitle("");
      setTags("");
      setImageFile(null);
      setImagePreview("");
      setTimeout(() => navigate('/arena'), 1500);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload meme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4 glow-text">
            ⚡ Cyber Champion Upload
          </h1>
          <p className="text-xl text-muted-foreground">
            Submit your best meme to compete in the digital arena
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card className="card-arena">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UploadIcon className="mr-2 text-primary" size={24} />
                Meme Details
              </CardTitle>
              <CardDescription>
                Fill in the details for your meme submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="title">Meme Title</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateCaptions}
                      disabled={isGenerating}
                      className="text-xs"
                    >
                      {isGenerating ? (
                        <RefreshCw className="mr-1 animate-spin" size={12} />
                      ) : (
                        <Sparkles className="mr-1" size={12} />
                      )}
                      AI Suggest
                    </Button>
                  </div>
                  <Input
                    id="title"
                    placeholder="Give your meme an epic title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-input/50 border-border"
                  />
                  
                  {suggestedCaptions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Sparkles size={12} className="mr-1" />
                        AI Suggested Captions:
                      </p>
                      <div className="space-y-1">
                        {suggestedCaptions.map((caption, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setTitle(caption)}
                            className="w-full text-left p-2 text-sm bg-muted/20 hover:bg-muted/40 rounded border border-border/50 hover:border-primary/50 transition-colors"
                          >
                            {caption}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="coding, funny, college, animals..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="bg-input/50 border-border"
                  />
                  <p className="text-xs text-muted-foreground">Add tags to help others find your meme</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageFile">Upload Image or Video Meme</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors relative">
                    {!imagePreview ? (
                      <div>
                        <Image className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <p className="text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Images: JPG, PNG, GIF, WebP | Videos: MP4, WebM
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          🔒 Login required to upload memes
                        </p>
                      </div>
                    ) : (
                      <div>
                        {imageFile?.type.startsWith('video/') ? (
                          <video
                            src={imagePreview}
                            className="max-h-48 mx-auto rounded-lg mb-4"
                            controls
                            muted
                          />
                        ) : (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-48 mx-auto rounded-lg mb-4"
                          />
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                        >
                          Change Media
                        </Button>
                      </div>
                    )}
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-arena"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Uploading to Arena...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2" size={20} />
                      Submit to Arena
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview & Tips */}
          <div className="space-y-8">
            {imagePreview && (
              <Card className="card-arena">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    How your meme will appear in the arena
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 rounded-lg p-4">
                    {imageFile?.type.startsWith('video/') ? (
                      <video
                        src={imagePreview}
                        className="w-full rounded-lg mb-4"
                        controls
                        muted
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="Meme preview"
                        className="w-full rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-bold text-lg">{title || "Your Awesome Title"}</h3>
                    <p className="text-muted-foreground text-sm">by You</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <Button size="sm" className="btn-vote-up">
                          ↑ 0
                        </Button>
                        <Button size="sm" className="btn-vote-down">
                          ↓ 0
                        </Button>
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Ready for battle!
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              <Card className="card-arena">
                <CardHeader>
                  <CardTitle>📊 Upload Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient-primary">2.4K</div>
                      <div className="text-sm text-muted-foreground">Memes Uploaded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gradient-secondary">89%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-arena">
                <CardHeader>
                  <CardTitle>💡 Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Keep it relevant</p>
                      <p className="text-sm text-muted-foreground">Trending topics get more votes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Quality matters</p>
                      <p className="text-sm text-muted-foreground">High-res content performs better</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Videos are trending</p>
                      <p className="text-sm text-muted-foreground">Video memes get 3x more engagement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-arena">
                <CardHeader>
                  <CardTitle>🏆 Recent Winners</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">"When you find a bug in production"</span>
                    <span className="text-primary font-bold">+234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">"Client changes requirements"</span>
                    <span className="text-primary font-bold">+445</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">"Emotional Damage"</span>
                    <span className="text-primary font-bold">+342</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;