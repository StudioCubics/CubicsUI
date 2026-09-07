import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  PasswordInput,
  TextInput,
} from "@cubicsui/components";
import { Polymorphic } from "./polymorphic";
import Image from "next/image";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<Card/>"}</code>
      </h1>
      <h2>Composed example</h2>
      <section>
        <div className="column image_bg">
          <Card fixedWidth="320px" elevation="high">
            <CardHeader
              title={<>Create your account</>}
              desc="Takes less than a minute"
              action={<Button size="xs">Get Help!</Button>}
            />
            <CardContent>
              <div className="column">
                <TextInput label="Full name" fullWidth />
                <TextInput label="Enter email address" type="email" fullWidth />
                <PasswordInput
                  label="Enter Password"
                  enableStrengthMeter
                  fullWidth
                  slotProps={{ strengthMeter: { score: 2 } }}
                />
                <Button fullWidth variant="contained">
                  Sign up
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button fullWidth>Google</Button>
              <Button fullWidth>linkedIn</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <h2>Sizes</h2>
      <p>
        Controls the internal padding scale and border-radius token used by the
        card.
      </p>
      <section>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <div className="column" key={size}>
            <h3>
              {size} {size === "md" && "(Default)"}
            </h3>
            <Card size={size} fixedWidth="220px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              consectetur quia maiores veniam.
            </Card>
          </div>
        ))}
      </section>

      <h2>Variants</h2>
      <section>
        <div className="column">
          <h3>contained (Default)</h3>
          <Card variant="contained" fixedWidth="220px">
            Solid surface background, no border.
          </Card>
        </div>
        <div className="column">
          <h3>outlined</h3>
          <Card variant="outlined" fixedWidth="220px">
            Bordered surface, useful on already-colored backgrounds.
          </Card>
        </div>
      </section>

      <h2>Elevation</h2>
      <p>Swaps the surface color token to imply stacking without shadows.</p>
      <section>
        <Card>
          Default surface
          <Card elevation="high">
            elevation=&quot;high&quot;
            <Card elevation="highest">elevation=&quot;highest&quot;</Card>
          </Card>
        </Card>
      </section>

      <h2>Layout props</h2>
      <section>
        <div className="column">
          <h3>square</h3>
          <Card square fixedWidth="180px">
            aspect-ratio: 1, content clipped/centered as needed
          </Card>
        </div>
        <div className="column" style={{ width: "100%" }}>
          <h3>fullWidth</h3>
          <Card fullWidth>Stretches to fill its parent&apos;s width.</Card>
        </div>
        <div className="column" style={{ height: "160px" }}>
          <h3>fullHeight (parent height: 160px)</h3>
          <Card fullHeight>Stretches to fill a sized parent.</Card>
        </div>
        <div className="column">
          <h3>disablePadding</h3>
          <Card disablePadding fixedWidth="180px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            odio expedita cupiditate ipsum debitis tempora neque rerum
            accusantium eligendi totam ratione quibusdam, dolorem necessitatibus
            sit soluta eius consequuntur vero nihil!
          </Card>
        </div>
      </section>

      <h2>
        As a different element (<code>as</code> prop)
      </h2>
      <Polymorphic />

      <h2>
        <code>{"<CardHeader/>"}</code>
      </h2>
      <section>
        <Card fixedWidth="450px">
          <CardHeader
            title={<>This is a card Title</>}
            desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi consectetur quia maiores veniam, ab dolorum delectus."
            action={
              <Button size="sm" variant="outlined">
                Some Action
              </Button>
            }
          />
        </Card>
        <div className="column">
          <h3>Long title + narrow card (container query wrap check)</h3>
          <Card fixedWidth="220px">
            <CardHeader
              title={<>A surprisingly long card title that should wrap</>}
              action={<Button size="xs">Edit</Button>}
            />
          </Card>
        </div>
      </section>

      <h2>
        <code>{"<CardContent/>"}</code>
      </h2>
      <section>
        <Card fixedWidth="300px">
          <CardHeader
            title={<>Login</>}
            desc="Enter your email and password to Login to your account"
            action={
              <>
                <Button size="sm" variant="outlined">
                  Register
                </Button>
                <Button size="xs">Get Help!</Button>
              </>
            }
          />
          <CardContent>
            <div className="column">
              <TextInput label="Enter email address" type="email" fullWidth />
              <PasswordInput label="Enter Password" fullWidth />
              <Button fullWidth variant="contained">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="column">
          <h3>
            With <code>overflowMargin</code>
          </h3>
          <Card fixedWidth="300px">
            <CardHeader
              title={<>Image bleed</>}
              desc="Content edge-to-edge, ignoring card padding"
            />
            <CardContent overflowMargin>
              <Image
                src="/images/landscapeSample.jpg"
                width={300}
                height={190}
                alt="placeholder"
                style={{ display: "block", width: "100%" }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <h2>Background check</h2>
      <section>
        <div className="column">
          <h3>On plain page background</h3>
          <Card fixedWidth="220px">Default surface on the page bg.</Card>
        </div>
        <div className="column rgb_bg">
          <h3>On RGB</h3>
          <Card fixedWidth="220px">Surface on top of loud colors.</Card>
        </div>
        <div className="column image_bg">
          <h3>On image</h3>
          <Card fixedWidth="220px">Surface on top of an image.</Card>
        </div>
      </section>

      <h2>
        <code>{"<CardFooter/>"}</code>
      </h2>
      <p>
        Footer sits below the card&apos;s opaque surface with a translucent,
        blurred background, it should show whatever is{" "}
        <em>behind the whole card</em>, not the card&apos;s own surface color.
      </p>
      <section>
        <h3>On image translucent footer over page background</h3>
        <div className="column image_bg">
          <Card fixedWidth="300px">
            <CardHeader
              title={<>Register</>}
              desc="Enter your email and password to Register an account"
              action={
                <>
                  <Button size="sm" variant="outlined">
                    Login
                  </Button>
                  <Button size="xs">Get Help!</Button>
                </>
              }
            />
            <CardContent>
              <div className="column">
                <TextInput label="Enter email address" type="email" fullWidth />
                <PasswordInput
                  label="Enter Password"
                  enableStrengthMeter
                  fullWidth
                  slotProps={{ strengthMeter: { score: 3 } }}
                />
                <Button fullWidth variant="contained">
                  Sign up
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button fullWidth>Google</Button>
              <Button fullWidth>linkedIn</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="column">
          <h3>On plain surface</h3>
          <Card fixedWidth="300px">
            <CardHeader
              title={<>Sign in</>}
              desc="Footer over a flat page background"
            />
            <CardContent>
              <TextInput label="Enter email address" type="email" fullWidth />
            </CardContent>
            <CardFooter>
              <Button fullWidth>Google</Button>
              <Button fullWidth>linkedIn</Button>
            </CardFooter>
          </Card>
        </div>

        <h3>Footer across sizes</h3>
        <div className="column image_bg">
          <div className="row">
            <Card fixedWidth="180px" size="xs">
              <CardContent>Small card</CardContent>
              <CardFooter>
                <Button fullWidth size="xs">
                  Continue
                </Button>
              </CardFooter>
            </Card>
            <Card fixedWidth="320px" size="xl">
              <CardContent>Large card</CardContent>
              <CardFooter>
                <Button fullWidth size="xl">
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <h3>Footer + outlined variant</h3>
        <div className="column image_bg">
          <Card fixedWidth="280px" variant="outlined">
            <CardContent>Outlined card with a footer below it.</CardContent>
            <CardFooter>
              <Button fullWidth variant="outlined">
                Google
              </Button>
              <Button fullWidth variant="outlined">
                linkedIn
              </Button>
            </CardFooter>
          </Card>
        </div>
        <h3>
          With <code>overflowMargin</code>
        </h3>
        <div className="column image_bg">
          <Card fixedWidth="280px">
            <CardContent>
              Card with a overflowMargin footer below it.
            </CardContent>
            <CardFooter overflowMargin>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              pariatur at aliquid dignissimos officia deserunt illum
              consequuntur nam, maxime voluptas esse dolorum. Dolore
              reprehenderit nostrum veniam temporibus doloremque illum
              consequuntur?
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
