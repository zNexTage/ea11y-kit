import * as Form from '@radix-ui/react-form';
import * as Slider from '@radix-ui/react-slider';
// import "./FormExample.style.css";

const FormExample = () => (
    <Form.Root className="FormRoot">
        <Form.Field className="FormField" name="email">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Email</Form.Label>              
            </div>
            <Form.Control asChild>
                <input className="Input" type="email" required />
            </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="question">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Question</Form.Label>
            </div>
            <Form.Control asChild>
                <textarea className="Textarea" required />
            </Form.Control>
        </Form.Field>

        <Slider.Root className="SliderRoot" defaultValue={[50]} max={100} step={1}>
            <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

        <Form.Submit asChild>
            <button style={{ marginTop: 10 }}>
                Post question
            </button>
        </Form.Submit>
    </Form.Root>
)

export default FormExample;