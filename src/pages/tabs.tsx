import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/components/ui/tabs'
import { PreviewCode } from '@/components/preview-code'

const categories = {
  Recent: [
    { id: 1, title: 'Does drinking coffee make you smarter?', date: '5h ago', comments: 5 },
    { id: 2, title: "So you've bought coffee... now what?", date: '2h ago', comments: 3 },
  ],
  Popular: [
    { id: 1, title: 'Is tech making coffee better or worse?', date: 'Jan 7', comments: 29 },
    { id: 2, title: 'The most innovative things happening in coffee', date: 'Mar 19', comments: 24 },
  ],
  Trending: [
    { id: 1, title: 'Ask Me Anything: 10 answers about coffee', date: '2d ago', comments: 9 },
    { id: 2, title: "The worst advice we've ever heard about coffee", date: '4d ago', comments: 1 },
  ],
}

function Preview() {
  return (
    <div className="w-full max-w-md">
      <TabGroup>
        <TabList>
          {Object.keys(categories).map((name) => (
            <Tab key={name}>{name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {Object.values(categories).map((posts) => (
            <TabPanel key={posts[0].id}>
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 text-sm/6 transition hover:bg-gray-200 dark:hover:bg-white/5"
                  >
                    <a href="#" className="font-semibold text-gray-900 dark:text-white">
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                    <ul
                      className="flex gap-2 text-gray-500 dark:text-white/50"
                      aria-hidden="true"
                    >
                      <li>{post.date}</li>
                      <li>·</li>
                      <li>{post.comments} comments</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  )
}

const code = `import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/components/ui/tabs'

export function Example() {
  return (
    <TabGroup>
      <TabList>
        <Tab>Recent</Tab>
        <Tab>Popular</Tab>
        <Tab>Trending</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Recent posts</TabPanel>
        <TabPanel>Popular posts</TabPanel>
        <TabPanel>Trending posts</TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
`

export default function TabsPage() {
  return (
    <PreviewCode
      title="Tabs"
      description="Accessible tab interfaces with full keyboard navigation."
      preview={<Preview />}
      code={code}
    />
  )
}
