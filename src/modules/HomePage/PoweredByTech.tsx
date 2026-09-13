'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import Container from '@/components/Container'
import { cn } from '@/lib/utils'
import { Constraction } from './Constraction'

export const cutflex = [
  {
    title: 'Đá mài [CutFlex]',
    info: ['Thông số kỹ thuật: 7"x1/16"x7/8" 180x1.6x22.2mm', 'Tốc độ cắt tối đa 8.500 RPM - 80m/s'],
  },
  {
    title: 'Đá mài [CutFlex]',
    info: ['Thông số kỹ thuật: 5"x1/4"x7/8" 125x6.0x22.2mm', 'Tốc độ cắt tối đa 12.200 RPM - 80m/s'],
  },
  {
    title: 'Đá mài [SharkFlex]',
    info: ['Thông số kỹ thuật: 4"x1/4"x5/8" 100x6.0x16mm', 'Tốc độ cắt tối đa 8.500 RPM - 80m/s'],
  },
  {
    title: 'Đá cắt [CutFlex]',
    info: ['Thông số kỹ thuật: 4"x3/64"x5/8" 107x1.0x16mm', 'Tốc độ cắt tối đa 15.200 RPM - 80m/s'],
  },
  {
    title: 'Đá cắt [SharkFlex]',
    info: ['Thông số kỹ thuật: 7"x1/16"x7/8" 107x1.0x16mm', 'Tốc độ cắt tối đa 13.300 RPM - 80m/s'],
  },
  {
    title: 'Máy mài cầm tay',
    info: ['Thông số kỹ thuật: 100 MM 850W - M10 - 2KG', '220 - 240V, 60/60Hz 12.000r/min'],
  },
  {
    title: 'Đá cắt [CutFlex]',
    info: ['Thông số kỹ thuật: 4"x3/64"x5/8" 107x1.0x16mm', 'Tốc độ cắt tối đa 15.200 RPM - 80m/s'],
  },
]

export const tempco = [
  {
    name: 'PRESSURE TRANSMITTER',
    details: [
      'Pressure range: 0-100 psi to 0-10,000 psi',
      'Accuracy: ±0.1% to ±1% FS (full scale)',
      'Sensitivity: 0.1-10 mV/psi',
    ],
    img: '/images/Tempco/Untitled-1-04.jpg',
  },
  {
    name: 'TEMPERATURE TRANSMITTER',
    details: [
      'Temperature range and accuracy',
      'Sensor input type (e.g., thermocouple, RTD, thermistor)',
      'Output signal (e.g., 4-20mA, 0-10V, digital)',
    ],
    img: '/images/Tempco/Untitled-1-05.jpg',
  },
  {
    name: 'DIAPHRAGM SEALS',
    details: [],
    img: '/images/Tempco/Untitled-1-06.jpg',
  },
  {
    name: 'REFRACTORY THERMOCOUPLES',
    details: [
      'For oxidizing, reducing and inert gas atmospheres',
      'Pressure and vacuum tight versions available in a range of models',
      'Also available as multi point thermocouples',
    ],
    img: '/images/Tempco/Untitled-1-07.jpg',
  },
  {
    name: 'SPECIAL RTDS',
    details: [
      'SSPRTT Semi Standard Platinum Resistance Thermometer',
      'Platinum Resistance Thermometer',
      'Slide shoe bearing RTDs',
    ],
    img: '/images/Tempco/Untitled-1-08.jpg',
  },
  {
    name: 'BEARING RTD',
    details: [
      'Key Specifications:',
      'Temperature Range: -50°C to 200°C',
      'Accuracy: ±0.15°C @ 0°C',
      'Response Time: 1-10 seconds',
      'Sensing Element: Pt100, Pt1000, etc',
      'Connection: Wired',
    ],
    img: '/images/Tempco/Untitled-1-09.jpg',
  },
  {
    name: 'TEMPERATURE INDICATOR',
    details: [
      'Analog Temperature Indicators (e.g., dial gauges, needle pointers)',
      'Digital Temperature Indicators (e.g., LCD, LED displays)',
      'Temperature Meters (e.g., handheld, benchtop, or panel-mounted)',
    ],
    img: '/images/Tempco/Untitled-1-10.jpg',
  },
  {
    name: 'PRESSURE GAUGES',
    details: [
      'Pressure gauges are available in dial sizes of 63, 100, 150 & 200mm with accuracy classes ranging from 0.25% to 2.5% accuracy from 1.6% to 1% of f.s. wetted parts include SS316/316L Monel, Hastelloy, Inconel',
    ],
    img: '/images/Tempco/Untitled-1-01.jpg',
  },
  {
    name: 'DIAPHRAGM SEALS',
    details: [],
    img: '/images/Tempco/Untitled-1-02.jpg',
  },
  {
    name: 'DIAPHRAGM SEALS',
    details: [],
    img: '/images/Tempco/Untitled-1-03.jpg',
  },
]

export const meihe = [
  {
    name: 'Integrate Type Electromagnetic Flowmeter',
    model: 'MLD1A',
    details: [
      'HD LCD Backlit Display',
      '0.2%, 0.5%, 1.0% Accuracy',
      'Tri-Electrodes Installed',
      '100% Unibody Red Coil',
      'Carbon Steel, SUS304 & 316L',
      '4-20mA, Pulse, RS485, HART',
      'New Designed Connection Flange',
    ],
    img: '/images/Meihe/elh-01.jpg',
  },
  {
    name: 'Sanitary Tri-Clamp Electromagnetic Flowmeter',
    model: 'MLD4A',
    details: [
      'SUS316L Body Material',
      'Tri-Clamp Fast Install Tech',
      '0.2%, 0.5%, 1.0% Accuracy',
      'Compact design & Easy cleaning',
      '100% Unibody Red Coil',
      '4-20mA, Pulse, RS485, HART',
      'Suitable for Edible Liquid',
    ],
    img: '/images/Meihe/elh-02.jpg',
  },
  {
    name: 'Clamp Type Electromagnetic Flowmeter',
    model: 'MLD1B',
    details: [
      'Compact Body Design',
      'High installation concentricity',
      '0.2%, 0.5%, 1.0% Accuracy',
      'Tri-Electrodes Installed',
      '100% Unibody Red Coil',
      '4-20mA, Pulse, RS485, HART',
      'Carbon Steel, SUS304 & 316L',
      'New Designed Connection Flange',
    ],
    img: '/images/Meihe/elh-03.jpg',
  },
  {
    name: 'Battery Powered Electromagnetic Flowmeter',
    model: 'MLD1D',
    details: [
      '3-5 Yrs Ultra Battery Life Power Supply',
      'Low Power Consumption',
      '0.5%, 1.0% Stable Accuracy',
      'Tri-Electrodes Installed',
      '100% Unibody Red Coil',
      'Support RS485, GPRS, Flow Data Monitor',
      'SUS304 & SUS316L Body Material',
    ],
    img: '/images/Meihe/elh-04.jpg',
  },
  {
    name: 'Remote Type Electromagnetic Flowmeter',
    model: 'MLD2A',
    details: [
      'Remote Flow Data Display',
      '0.2%, 0.5%, 1.0% Accuracy',
      'Tri-Electrodes Installed',
      '100% Unibody Red Coil',
      'Carbon Steel, SUS304 & 316L',
      'Signal Cable Length Customizable',
    ],
    img: '/images/Meihe/elh-05.jpg',
  },
  {
    name: 'Insertion Type Electromagnetic Flowmeter',
    model: 'MLD6A',
    details: [
      'Quick Install & Remove',
      'Suitable for Pipeline ≥ DN200',
      'All SUS304 & 316L Electrical Interface',
      'Pressure Resistance Up to 2.5Mpa',
      '4-20mA, Pulse, RS485, HART',
      'Support 220V AC & 24V DC',
      'Support Remote Type Display',
    ],
    img: '/images/Meihe/elh-06.jpg',
  },
  {
    name: 'High Pressure Type Electromagnetic Flowmeter',
    model: 'MLD-HPIA',
    details: [
      'High Pressure Resistance Up to 42MPa',
      'Various Display flow Data',
      'Anti-Surge & Anti-Interference Circuit Design',
      'Adhesive Smooth Pure Copper Coil Wire',
      'Fully Enclosed Isolation Sensor',
      'Multiple Power Supply & Output Signals',
      'Various International Units Display',
    ],
    img: '/images/Meihe/elh-16.jpg',
  },
  {
    name: 'Pipe Partially Filled Electromagnetic Flowmeter',
    model: 'MLD-PFIA',
    details: [
      'For flow measurement of partially filled pipes (round pipes, rectangular pipes)',
      'Can be used for continuous metering in municipal rainwater, wastewater, sewage discharge and irrigation water pipelines and other places',
      'Forward and reverse bidirectional flow measurement',
      '4-20mA, Pulse, RS485, RS232, HART',
      'Not affected by downstream, tributary stagnation, blockage and other factors',
      'Sensors can work for a long time in harsh field and sewage water quality',
      'Can display instantaneous flow, flow rate, cumulative flow, liquid level and other data',
    ],
    img: '/images/Meihe/elh-15.jpg',
  },
  {
    name: 'Open Channel Flowmeter',
    model: 'MLDC-1A',
    details: [
      'Wide compatibility, all standard channels can be applied',
      'Reliable stability, long-term online measurement, maintenance-free',
      'Parameters such as partial blind area support manual modification, which can shield nearby interference sources',
      'The sensor has a built-in temperature sensor to realize real-time temperature compensation of the measured value, and the measurement is more accurate',
      'Support a variety of signal output (485, relay, 4-20mA)',
    ],
    img: '/images/Meihe/elh-14.jpg',
  },
  {
    name: 'Vortex Flowmeter',
    model: 'LUGB-1A',
    details: [
      'Ultra-low Power Consumption Chip Adopted',
      'High Accuracy Up to 0.5%R',
      'Simple Structure. No Moving & Wearing Parts.',
      'Support Tempature & Pressure Data Fixing for Nominal Value',
      'All SUS304 & 316L material. Great Anti-Corrosive Performance',
      'Intelligent LCD Display. Can Display Instantaneous Flow & Cumulative Flow Velocity',
      'Multiple Installation Types. Suitable for All Type Pipes',
    ],
    img: '/images/Meihe/elh-06.jpg',
  },
  {
    name: 'Vortex Flowmeter with Temperature and Pressure Data Fixing',
    model: 'LUGB-1Z',
    details: [
      'Online temperature, pressure data fixing, artificial fixed value density revise',
      'Suitable for application of steam, saturated steam, overheated steam, and normal gas measurement.',
      'Ultra-low Power Consumption Chip Adopted',
      'Simple Structure. No Moving & Wearing Parts.',
      'Flow signals can be transferred over long distances, and can be networked with computers to achieve centralized management.',
    ],
    img: '/images/Meihe/elh-07.jpg',
  },
  {
    name: 'Ultrasonic Flowmeter',
    model: 'MFLO-2000',
    details: [
      'Up to ±1% High Accuracy Measurement',
      'Light Weight and compact design',
      'Non-Intrusive Measure. Clamp-On transducer, no pressure drop and no pipe cutting.',
      'Multiple transducer types for wide measuring range, from DN15mm to DN6000mm.4~20mA, Pulse, RS485, HART',
      'Large LCD Display. Display instantaneous flow, cumulative flow (positive, negative, net), velocity, working status etc.',
      'Built-in 24K Data Logger, store over 2000 lines measuring data.',
      'Compatible with all pipe material. Cast Iron, Glass Pipe, Anti-corrosion Pipe, or Stainless Steel Pipe.',
    ],
    img: '/images/Meihe/elh-17.jpg',
  },
  {
    name: 'Gas Turbine Flowmeter',
    model: 'MLWGQ',
    details: [
      'Tiny gas flow can be measured',
      'Small pressure loss with great anti-vibration and anti-pulsation flow performance.',
      'Upgrade high quality impeller, more stable and anti-clogging',
      'Various Display Units, kg, m³, ton, liter, gallon, etc.',
      'Temperature, pressure and flow of the measured gas can be detected, and can automatically track and fix the flow data.',
      'Using advanced micro-power high-tech, low power consumption.',
      'Excellent forging process with intelligent led display, can check temperature, pressure, flow, time, date and other data in real time.',
    ],
    img: '/images/Meihe/elh-08.jpg',
  },
  {
    name: 'Liquid Turbine Flowmeter',
    model: 'MLWGY',
    details: [
      'Converter can be 180° rotated',
      'Multiple power supply modes',
      'Upgrade high quality impeller, more stable and anti-clogging',
      'Various Display Units, kg, m³, ton, liter, gallon, etc.',
      'Excellent Repeatability 0.05% ~ 0.2%',
      'Suitable for application of blending/batching as well as storage and off-loading, etc.',
      'Excellent forging process with high wear resistance & high pressure application.',
    ],
    img: '/images/Meihe/elh-10.jpg',
  },
  {
    name: 'Ultrasonic Flowmeter',
    model: 'MFLO-2000H',
    details: [
      'Up to ±1% High Accuracy Measurement',
      'Light Weight and compact design',
      'Non-Intrusive Measure. Clamp-On transducer, no pressure drop and no pipe cutting.',
      'Multiple transducer types for wide measuring range, from DN15mm to DN6000mm.4~20mA, Pulse, RS485, HART',
      'Large LCD Display. Display instantaneous flow, cumulative flow (positive, negative, net), velocity, working status etc.',
      'Built-in 24K Data Logger, store over 2000 lines measuring data.',
      'Compatible with all pipe material. Cast Iron, Glass Pipe, Anticorrosion Pipe, or Stainless Steel Pipe.',
    ],
    img: '/images/Meihe/elh-18.jpg',
  },
  {
    name: 'Standard Venturi Tube',
    model: 'LWG-1C',
    details: [
      'Simple structure, durable and stable performance.',
      'The pressure loss is small, saving the energy required for fluid transportation.',
      'In the range of diameter 50-1200, no real flow calibration is required. Beyond this range, you can refer to the design and manufacture.',
      'When higher accuracy is required, real-flow calibration can be performed.',
      'The installation dimension of the body is long, which is not convenient for transportation and installation for large-diameter instruments.',
    ],
    img: '/images/Meihe/elh-22.jpg',
  },
  {
    name: 'Standard Orifice Plate Flowmeter',
    model: 'LGB-1A',
    details: [
      'Measure general fluids, and also suitable for liquid contains various impurities (such as dust, suspension, precipitation, etc.), such as gas hot air, flue gas, natural gas, cooling circulating water, etc.',
      'When measuring saturated steam superheated steam, it can avoid the accumulation of condensed water formed by stopping the steam. When the steam is sent again, it will quickly enter the accurate measurement.',
      'The other section of the instrument body has a straight measuring tube, and the errors of on-site installation (such as eccentricity, the sealing gasket extending into the pipe) has little effect on the instrument measurement.',
      'Equipped with "Pressure Equalizing Ring", even if the length of the straight pipe section is not enough, it can still measure accurately. has little effect on the instrument measurement.',
      '"Jacket insulation" structure, suitable for fluids that are easy',
    ],
    img: '/images/Meihe/elh-21.jpg',
  },
  {
    name: 'Integrated (orifice plate, annular orifice plate, nozzle) flowmeter',
    model: 'LGP-1A',
    details: [
      'Small pressure loss, saving energy',
      'Sturdy and durable, suitable for high temperature and high pressure fluids',
      'Widely used in steam flow measurement in electric power, chemical and other industries.',
      'No real flow calibration is required, and the accuracy is moderate.',
      'The accessories are complete, which can be designed and calculated for the user.',
      'It can be equipped with a differential pressure transmitter to realize temperature, pressure compensation or field bus communication.',
    ],
    img: '/images/Meihe/elh-12.jpg',
  },
  {
    name: 'Balanced Flow Meter',
    model: 'LGB-1B',
    details: [
      'The accuracy of the sensor can reach ±0.3%, ±0.5%, which is suitable for trade metering occasions.',
      'The balanced flow sensor can balance the flow field, adjust it stably, and the pressure recovery is twice as fast as that of the traditional throttling device.',
      'In most cases, the straight pipe section can be as small as 0.5D ~ 2D.',
      'The symmetrical balance design of the balanced flow meter reduces the formation of vortices and turbulent friction, reduces the loss of kinetic energy',
      'The conventional measurement range ratio of 10:1, choose the appropriate parameters can achieve 30:1 or higher.',
      'The balanced flow sensor can balance and stabilize the flow field, which greatly improves the repeatability, which can reach ±0.1%.',
    ],
    img: '/images/Meihe/elh-09.jpg',
  },
  {
    name: 'V-Cone Flowmeter',
    model: 'LGV-1A',
    details: [
      'The upstream and downstream straight pipe sections are required to be short: the shortest length of the upstream straight pipe section is 3D, (3D is required for installation downstream of the valve), and the shortest length of the downstream straight pipe section is <3D;',
      'High accuracy, up to +0.5%; repeatability down to 0.1%; turndown ratio up to 15:1;',
      'Dirt resistance and small pressure loss;',
      'With flow adjustment and mixing effect on fluid;',
      'Easy installation, maintenance-free or small workload.',
    ],
    img: '/images/Meihe/elh-11.jpg',
  },
  {
    name: 'Thermal Gas Mass Flowmeter',
    model: 'TMGF-1A',
    details: [
      'Easy Installation and Maintenance',
      'Bluetooth Transmission Function Support. Can be operated through mobile phone App.',
      'Equipped with Modbus Communication, remote monitoring.',
      'Wide range ratio, wide measurement flow rate range.',
      'No internal moving parts, no pressure loss.',
      'Gas mass flow can be measured without temperature and pressure compensation',
      'Fully isolated electrical structure thoroughly filters out external interference.',
    ],
    img: '/images/Meihe/elh-20.jpg',
  },
  {
    name: 'Coriolis Mass Flowmeter',
    model: 'CMF-1A',
    details: [
      'High mass accuracy, measurement error better than ±0.1%',
      'High density accuracy, measurement error better than ±0.0005g/cm³',
      'High temperature accuracy, measurement error better than ±0.2°C',
      'Good zero point stability to ensure long-term stable operation',
      'Fast response time, suitable for small batches, short filling times',
      'Wide turndown ratio, the turndown ratio can reach 20:1',
      'Long service life, product design service life is 10 years',
      'Has more built-in alert features',
    ],
    img: '/images/Meihe/elh-19.jpg',
  },
]

const PoweredByTech = ({ title }: { title?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.get('product') || ''

  const convertIndex = (params: string) => {
    if (params === 'janastic') return 0
    if (params === 'tempco') return 1
    if (params === 'cutflex') return 2
    if (params === 'meihe') return 3
    return 0
  }
  const [index, setIndex] = useState<number>(convertIndex(params))
  useEffect(() => {
    setIndex(convertIndex(params))
  }, [params])

  return (
    <section id="powered">
      <Container>
        <div className="mt-10 mb-32 ml-auto w-fit">
          {/* <svg width={237} height={70} viewBox="0 0 237 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.899902 0.699951H236.1V70L0.899902 0.699951Z" fill="#F6921E" />
          </svg> */}
        </div>

        <div className="text-right">
          <p className="text-sm">Powered by</p>
          <p className="text-2xl leading-none font-semibold">Information</p>
          <div className="flex items-end">
            <div className="bg-primary-blue h-px w-full" />
            <p className="leading-none font-semibold">Technology</p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="border-primary-blue mt-8 grid place-items-center gap-x-4 gap-y-8 border-b pb-4 md:grid-cols-2 md:place-items-start lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn('cursor-pointer border border-transparent p-2', {
                  'border-primary-orange rounded-lg': i === index,
                })}
                onClick={() => setIndex(i)}
              >
                <Image
                  className={cn({ 'rounded-lg': i === index })}
                  src={`/images/tech-${i + 1}.png`}
                  width={350}
                  height={337}
                  alt="Technology"
                />
              </div>
            ))}
          </div>

          <div className="gap-10 space-y-4 md:grid md:grid-cols-2 md:space-y-0 xl:grid-cols-4">
            {/* {index === 0 &&
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <div className="h-full">
                    <Image
                      src={`/images/cong_trinh/1-${i === 9 ? `10` : `0${i + 1}`}.png`}
                      width={400}
                      height={400}
                      alt="Janastic"
                      className="h-full"
                    />
                  </div>
                </div>
              ))} */}
            {index === 0 &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-full">
                    <Image
                      src={`/images/Janastic/Untitled-1-${i === 9 ? `10` : `0${i + 1}`}.jpg`}
                      width={400}
                      height={400}
                      alt="Janastic"
                      className="h-full"
                    />
                  </div>
                </div>
              ))}
            {index === 1 &&
              tempco.slice(0, 4).map(({ details, name, img }, i) => (
                <div key={i} className="space-y-4 bg-white p-4">
                  <div>
                    <Image src={img || ''} width={400} height={400} alt="Tempco" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{name}</p>
                    <ul className="mt-2 ml-5 list-disc">
                      {details?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            {index === 2 &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 bg-white p-4">
                  <div>
                    <Image src={`/images/CutFlex/sp-web-elh-0${i + 1}.jpg`} width={400} height={400} alt="CutFlex" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{cutflex[i]?.title}</p>
                    <ul className="mt-2 ml-5 list-disc">
                      {cutflex[i]?.info?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            {index === 3 &&
              meihe.slice(0, 4).map(({ details, img, model, name }, i) => (
                <div key={i} className="space-y-4 bg-white p-4">
                  <div>
                    <Image src={img} width={400} height={400} alt="Meihe" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{name}</p>
                    <p className="font-i-ciel-gotham font-medium">Model: {model}</p>
                    <ul className="mt-2 ml-5 list-disc">
                      {details?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            {index === 4 &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 bg-white p-4">
                  <div>
                    <Image src={`/images/IGUS/sp-0${i + 1}.png`} width={400} height={400} alt="CutFlex" />
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() =>
                router.push(
                  `/catalog/?product=${index === 0 ? 'janastic' : index === 1 ? 'tempco' : index === 2 ? 'cutflex' : index === 3 ? 'meihe' : 'igus'}`,
                )
              }
              className="bg-primary-blue hover:bg-primary-blue/90 rounded-lg px-4 py-2 text-white"
            >
              Xem thêm
            </button>
          </div>
        </div>

        <Constraction />

        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-end gap-x-4">
            <div className="bg-primary-orange h-10 w-28" />
            <div className="bg-primary-blue h-10 w-40" />
          </div>
          <div className="bg-bg_factory h-[150px] bg-cover bg-position-[center_top] bg-no-repeat lg:h-[300px] lg:bg-position-[center_33%]" />
          <div className="flex items-center justify-between">
            <div className="font-iCielGotham">
              <p className="text-2xl font-bold text-[#10415d] uppercase">{title || 'ELH Technology'}</p>
              <p className="text-primary-orange text-lg font-medium">Every Little Helps</p>
            </div>
            <div className="flex items-center gap-x-4">
              <div>
                <Image src="/icons/tools.svg" width={42} height={42} alt="Services" />
              </div>
              <div>
                <Image src="/icons/factory.svg" width={42} height={42} alt="Factory" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PoweredByTech
