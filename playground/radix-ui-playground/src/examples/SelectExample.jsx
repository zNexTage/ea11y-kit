import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import "./SelectExample.css";

const SelectExample = () => (
    <Select.Root>
        <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select a fruit…" />
            <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <Select.Group>
                        <Select.Label className="SelectLabel">Fruits</Select.Label>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="blueberry">Blueberry</Select.Item>
                        <Select.Item value="grapes">Grapes</Select.Item>
                        <Select.Item value="pineapple">Pineapple</Select.Item>
                    </Select.Group>

                    <Select.Separator className="SelectSeparator" />

                    <Select.Group>
                        <Select.Label className="SelectLabel">Vegetables</Select.Label>
                        <Select.Item value="aubergine">Aubergine</Select.Item>
                        <Select.Item value="broccoli">Broccoli</Select.Item>
                        <Select.Item value="carrot" disabled>
                            Carrot
                        </Select.Item>
                        <Select.Item value="courgette">Courgette</Select.Item>
                        <Select.Item value="leek">Leek</Select.Item>
                    </Select.Group>

                    <Select.Separator className="SelectSeparator" />

                    <Select.Group>
                        <Select.Label className="SelectLabel">Meat</Select.Label>
                        <Select.Item value="beef">Beef</Select.Item>
                        <Select.Item value="chicken">Chicken</Select.Item>
                        <Select.Item value="lamb">Lamb</Select.Item>
                        <Select.Item value="pork">Pork</Select.Item>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
)

export default SelectExample;