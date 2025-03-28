import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Shield, Clock, MessageSquare } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
              FIR
            </div>
            <span className="font-semibold">AI FIR Assistant</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                How It Works
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </Link>
            </nav>
            <ThemeToggle />
            <Link href="/chat">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container flex flex-col items-center justify-center space-y-4 py-24 text-center md:py-32">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI-Powered FIR Generation
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Generate accurate First Information Reports in seconds with our advanced AI assistant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/chat">
                <Button size="lg" className="gap-1.5">
                  Start Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Our AI FIR Assistant comes with powerful features to streamline your reporting process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Accurate FIR Generation</h3>
              <p className="mt-2 text-muted-foreground">
                Generate legally accurate FIR reports based on incident descriptions with proper sections and details.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Private</h3>
              <p className="mt-2 text-muted-foreground">
                Your data is encrypted and secure. We prioritize privacy and confidentiality in all reports.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Save Time</h3>
              <p className="mt-2 text-muted-foreground">
                Reduce report generation time from hours to minutes with our AI-powered assistant.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Conversational Interface</h3>
              <p className="mt-2 text-muted-foreground">
                Natural language interface that guides you through the reporting process with ease.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-smartphone"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Mobile Friendly</h3>
              <p className="mt-2 text-muted-foreground">
                Access the FIR assistant from any device, anytime. Fully responsive design for on-the-go reporting.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-copy"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Easy Export</h3>
              <p className="mt-2 text-muted-foreground">
                Copy and export your FIR reports in various formats for official submission and record keeping.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted/40 py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">Generate an FIR report in three simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Describe the Incident</h3>
                  <p className="text-muted-foreground">
                    Provide details about the incident including location, time, people involved, and nature of the
                    crime.
                  </p>
                </div>
                <div className="hidden md:block absolute top-6 left-full w-full transform -translate-x-1/2 mt-6">
                  <div className="border-t-2 border-dashed border-muted-foreground/30 w-full"></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Processes Information</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes the details, identifies relevant legal sections, and structures the information.
                  </p>
                </div>
                <div className="hidden md:block absolute top-6 left-full w-full transform -translate-x-1/2 mt-6">
                  <div className="border-t-2 border-dashed border-muted-foreground/30 w-full"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Your FIR Report</h3>
                  <p className="text-muted-foreground">
                    Review the generated FIR report and copy it for official submission or record keeping.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/chat">
                <Button size="lg" className="gap-1.5">
                  Try It Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">Common questions about our AI FIR Assistant</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">Is the generated FIR legally valid?</h3>
              <p className="mt-2 text-muted-foreground">
                The AI-generated FIR provides a structured draft based on your input. While it follows legal formats, we
                recommend reviewing it with legal professionals before official submission.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">How secure is my data?</h3>
              <p className="mt-2 text-muted-foreground">
                We prioritize your privacy. All data is encrypted and we don't store sensitive information. Our system
                follows strict data protection protocols.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">Can I edit the generated FIR?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes, you can copy the generated FIR and edit it as needed. The system provides a structured draft that
                you can modify to include additional details.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">What information should I provide?</h3>
              <p className="mt-2 text-muted-foreground">
                For best results, include details about the incident location, time, people involved, nature of the
                crime, and any evidence or witnesses available.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to Streamline Your FIR Process?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl mb-8">
              Start using our AI FIR Assistant today and experience the future of incident reporting.
            </p>
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="gap-1.5">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                  FIR
                </div>
                <span className="font-semibold">AI FIR Assistant</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                AI-powered First Information Report generation system for efficient and accurate incident reporting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 AI FIR Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

