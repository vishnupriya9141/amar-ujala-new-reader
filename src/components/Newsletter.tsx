import { Mail } from "lucide-react";
import Section from "./ui/Section";
import FormField from "./ui/FormField";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const { toast } = useToast();

  const handleSubmit = (email: string) => {
    toast({
      title: "सफलतापूर्वक सब्सक्राइब किया गया!",
      description: "आपको नवीनतम समाचार ईमेल पर मिलते रहेंगे।",
    });
  };

  return (
    <Section
      title="न्यूज़लेटर सब्सक्राइब करें"
      icon={<Mail className="w-12 h-12 text-primary" />}
      className="bg-card border border-border rounded-lg p-8 my-8"
      titleClassName="text-2xl font-bold text-foreground mb-2"
      contentClassName="max-w-2xl mx-auto text-center"
    >
      <p className="text-muted-foreground mb-6">
        रोजाना सबसे महत्वपूर्ण खबरें सीधे अपने ईमेल पर प्राप्त करें
      </p>
      <FormField
        type="email"
        placeholder="अपना ईमेल दर्ज करें"
        buttonText="सब्सक्राइब करें"
        required
        onSubmit={handleSubmit}
      />
    </Section>
  );
};

export default Newsletter;
