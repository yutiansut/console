import { Box, Button, Modal, Text, Tooltip, px } from '@mantine/core';
import { FC, useEffect } from 'react';
import { useInfoModalStyles } from './styles';
import { useGetAbout } from '@/hooks/useGetAbout';
import { IconAlertCircle, IconBook2, IconBrandGithub, IconBrandSlack, IconBusinessplan } from '@tabler/icons-react';

const helpResources = [
	{
		icon: IconBrandSlack,
		title: 'Slack',
		description: 'Connect with us',
		href: 'https://launchpass.com/parseable',
	},
	{
		icon: IconBrandGithub,
		title: 'GitHub',
		description: 'Find resources',
		href: 'https://github.com/parseablehq/parseable',
	},
	{
		icon: IconBook2,
		title: 'Documentation',
		description: 'Learn more',
		href: 'https://www.parseable.io/docs/introduction',
	},
	{
		icon: IconBusinessplan,
		title: 'Get paid support',
		description: 'Get paid support',
		href: 'mailto:support@parseable.io', //https://www.parseable.io/pricing
	},
];

type HelpCardProps = {
	data: (typeof helpResources)[number];
};

const HelpCard: FC<HelpCardProps> = (props) => {
	const { data } = props;

	const { classes } = useInfoModalStyles();
	const { HelpIconBox } = classes;

	return (
		<Tooltip label={data.description} position="bottom" withArrow sx={{ color: 'white', backgroundColor: 'black' }}>
			<Button className={HelpIconBox} component={'a'} href={data.href} target="_blank">
				<data.icon size={px('1.2rem')} stroke={1.5} />
			</Button>
		</Tooltip>
	);
};

type InfoModalProps = {
	opened: boolean;
	close(): void;
};

const InfoModal: FC<InfoModalProps> = (props) => {
	const { opened, close } = props;

	const { data, loading, error, getAbout, resetData } = useGetAbout();
	useEffect(() => {
		if (data) {
			resetData();
		}
		getAbout();
		return () => {
			resetData();
		};
	}, []);

	const { classes } = useInfoModalStyles();
	const {
		container,
		parseableText,
		aboutTitle,
		aboutDescription,
		actionBtn,
		helpIconContainer,
		aboutTextBox,
		aboutTextKey,
		aboutTextValue,
		aboutTextInnerBox,
		actionBtnRed
	} = classes;

	return (
		<Modal
			opened={opened}
			onClose={close}
			withinPortal
			withCloseButton={false}
			size="xl"
			centered>
			<Box className={container}>

					<Text className={aboutTitle}>
						About <span className={parseableText}>Parseable</span>
					</Text>
					<Text className={aboutDescription} id="info-modal-description">
						Here you can find useful information about your Parseable instance.
					</Text>
					{error ? (
						<Text className={aboutDescription}>Error...</Text>
					) : loading ? (
						<Text className={aboutDescription}>Loading...</Text>
					) : data ? (
						<>
							<Box className={aboutTextBox}>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}> License: </Text>
									<Text className={aboutTextValue}> {data.license} </Text>
									<Button
									variant="outline"
									component={'a'}
									href="mailto:support@parseable.io"
									target="_blank"
									className={actionBtn}
									>
									Upgrade to commercial license
								</Button>
								</Box>
								
							</Box>
							<Box className={aboutTextBox}>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}> Commit: </Text>
									<Text className={aboutTextValue}> {data.commit} </Text>
								</Box>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}> Version: </Text>
									<Text className={aboutTextValue}> {data.version} </Text>
									{data.updateAvailable ? (
										<Button
										variant="outline"
										component={'a'}
										href="https://github.com/parseablehq/parseable/releases/latest"
										target="_blank"
										className={actionBtnRed}
										leftIcon={<IconAlertCircle size={px('1.2rem')} stroke={1.5} />}
										>
										Upgrade to latest version {data.latestVersion}
									</Button> ): null}
								</Box>
								
							</Box>
							<Box className={aboutTextBox}>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}> Deployment Id: </Text>
									<Text className={aboutTextValue}> {data.deploymentId} </Text>
								</Box>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}>Mode</Text>
									<Text className={aboutTextValue}>{data.mode}</Text>
								</Box>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}>Staging</Text>
									<Text className={aboutTextValue}>{data.staging}</Text>
								</Box>
								<Box className={aboutTextInnerBox}>
									<Text className={aboutTextKey}>Store</Text>
									<Text className={aboutTextValue}>{data.store}</Text>
								</Box>
							</Box>
						</>
					) : null}
				
				
					<Text className={aboutTitle}>Need any help?</Text>
					<Text className={aboutDescription}>Here you can find useful resources and information.</Text>

					<Box mt={15} className={helpIconContainer}>
						{helpResources.map((data) => (
							<HelpCard key={data.title} data={data} />
						))}
					</Box>
				</Box>
			
		</Modal>
	);
};

export default InfoModal;
