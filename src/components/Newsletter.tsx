import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "सफलतापूर्वक सब्सक्राइब किया गया!",
        description: "आपको नवीनतम समाचार ईमेल पर मिलते रहेंगे।",
      });
      setEmail("");
    }
  };

  return (
    <section className="bg-card border border-border rounded-lg p-8 my-8">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          न्यूज़लेटर सब्सक्राइब करें
        </h2>
        <p className="text-muted-foreground mb-6">
          रोजाना सबसे महत्वपूर्ण खबरें सीधे अपने ईमेल पर प्राप्त करें
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="अपना ईमेल दर्ज करें"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">सब्सक्राइब करें</Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
