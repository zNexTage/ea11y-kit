import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';



const CheckboxExample = () => (
    <form>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox.Root name='teste' className="CheckboxRoot" defaultChecked id="c1">
                <Checkbox.Indicator className="CheckboxIndicator">
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="Label" htmlFor="c1">
                Codificação
            </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox.Root name='teste' className="CheckboxRoot" defaultChecked id="c2">
                <Checkbox.Indicator className="CheckboxIndicator">
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <label className="Label" htmlFor="c2">
                Música
            </label>
        </div>
    </form>
)

export default CheckboxExample;