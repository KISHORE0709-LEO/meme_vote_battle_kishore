import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, Image, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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

    if (!image) {
      toast({
        title: "Image Required", 
        description: "Please select an image for your meme",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Meme Uploaded! 🎉",
        description: "Your meme has entered the arena and is ready for battle!",
      });
      
      // Reset form
      setTitle("");
      setImage(null);
      setImagePreview("");
    }, 2000);
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
                  <Label htmlFor="title">Meme Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your meme an epic title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-input/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    {!imagePreview ? (
                      <div>
                        <Image className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <p className="text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => {
                            setImage(null);
                            setImagePreview("");
                          }}
                        >
                          Change Image
                        </Button>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
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
                    <img
                      src={imagePreview}
                      alt="Meme preview"
                      className="w-full rounded-lg mb-4"
                    />
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

            <Card className="card-arena">
              <CardHeader>
                <CardTitle>Pro Tips 💡</CardTitle>
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
                    <p className="text-sm text-muted-foreground">High-res images perform better</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Timing is key</p>
                    <p className="text-sm text-muted-foreground">Upload during peak hours for max exposure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;