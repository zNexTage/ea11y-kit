import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes"

const ButtonExample = () => {
    return (
        <>
            <Button>
                <BookmarkIcon /> Bookmark
            </Button>
            <br />
            <Button style={{ marginTop: 10 }} size="1" variant="soft">
                Edit profile
            </Button>
            <br />
            <hr />
            <br />
            <Button style={{ marginTop: 10 }} variant="classic">Edit profile</Button>
            <br />
            <Button style={{ marginTop: 10 }} variant="solid">Edit profile</Button>
            <br />
            <Button style={{ marginTop: 10 }} variant="soft">Edit profile</Button>
            <br />
            <Button style={{ marginTop: 10 }} variant="surface">Edit profile</Button>
            <br />
            <Button style={{ marginTop: 10 }} variant="outline">Edit profile</Button>

            <br />
            <br />

            <Flex gap="3">
                <Button color="indigo" variant="soft">
                    Edit profile
                </Button>
                <Button color="cyan" variant="soft">
                    Edit profile
                </Button>
                <Button color="orange" variant="soft">
                    Edit profile
                </Button>
                <Button color="crimson" variant="soft">
                    Edit profile
                </Button>
            </Flex>
            <br />
            <br />
            <Flex direction="column" gap="3">
                <Flex gap="3">
                    <Button color="gray" variant="classic">
                        Edit profile
                    </Button>
                    <Button color="gray" variant="solid">
                        Edit profile
                    </Button>
                    <Button color="gray" variant="soft">
                        Edit profile
                    </Button>
                    <Button color="gray" variant="surface">
                        Edit profile
                    </Button>
                    <Button color="gray" variant="outline">
                        Edit profile
                    </Button>
                </Flex>

                <Flex gap="3">
                    <Button color="gray" variant="classic" highContrast>
                        Edit profile
                    </Button>
                    <Button color="gray" variant="solid" highContrast>
                        Edit profile
                    </Button>
                    <Button color="gray" variant="soft" highContrast>
                        Edit profile
                    </Button>
                    <Button color="gray" variant="surface" highContrast>
                        Edit profile
                    </Button>
                    <Button color="gray" variant="outline" highContrast>
                        Edit profile
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}

export default ButtonExample;