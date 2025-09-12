import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ShoppingAssistant from "@/components/ShoppingAssistant";
import { ResizablePopup } from "@/components/ResizablePopup";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome to AI Shopping
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Click the assistant button to start shopping
        </p>
      </div>
      
      {/* Floating Assistant Button */}
      <Button
        size="lg"
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <div className="flex items-center justify-center">
          <MessageCircle className="h-6 w-6" />
          <Sparkles className="h-4 w-4 -ml-1 -mt-1" />
        </div>
      </Button>

      {/* Resizable Assistant Popup */}
      <ResizablePopup
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        title="AI Shopping Assistant"
        defaultWidth={800}
        defaultHeight={600}
        minWidth={600}
        minHeight={400}
      >
        <ShoppingAssistant />
      </ResizablePopup>
    </div>
  );
};

export default Index;
